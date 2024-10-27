package storage

import (
	"context"
	"fmt"
	"net/url"
	"time"

	"athena.io/config"
	"github.com/Azure/azure-sdk-for-go/sdk/azidentity"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/sas"
)

func generateSasURL(accountName, accountKey, containerName, blobName, fileName string) (string, error) {
	startTime := time.Now().UTC().Add(-1 * time.Minute)
	expiryTime := time.Now().UTC().Add(expires)

	sharedKey, err := azblob.NewSharedKeyCredential(accountName, accountKey)
	if err != nil {
		return "", err
	}

	permissions := sas.BlobPermissions{Read: true}
	sasQueryParams, err := sas.BlobSignatureValues{
		Protocol:           sas.ProtocolHTTPS,
		StartTime:          startTime,
		ExpiryTime:         expiryTime,
		Permissions:        permissions.String(),
		ContainerName:      containerName,
		BlobName:           blobName,
		ContentDisposition: fmt.Sprintf("attachment; filename=\"%s\"", fileName),
	}.SignWithSharedKey(sharedKey)

	if err != nil {
		return "", fmt.Errorf("error generating SAS query parameters: %v", err)
	}

	baseURL := fmt.Sprintf("https://%s.blob.core.windows.net",
		accountName)

	u, err := url.Parse(baseURL)
	if err != nil {
		return "", fmt.Errorf("error parsing URL: %v", err)
	}

	u.RawQuery = sasQueryParams.Encode()

	return u.String(), nil
}

type AzPresigner struct {
	Client *azblob.Client
}

func (presigner AzPresigner) Download(ctx context.Context, filename string, displayName string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(bucketName).NewBlobClient(filename)

	permissions := sas.BlobPermissions{Read: true}
	expiry := time.Now().Add(expires).UTC()

	sasURL, err := blobClient.GetSASURL(permissions, expiry, nil)
	if err != nil {
		return "", err
	}

	return sasURL, nil
}

func (presigner AzPresigner) Upload(ctx context.Context, filename string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(bucketName).NewBlobClient(filename)

	permissions := sas.BlobPermissions{Write: true}
	expiry := time.Now().Add(expires).UTC()

	sasURL, err := blobClient.GetSASURL(permissions, expiry, nil)
	if err != nil {
		return "", err
	}

	return sasURL, nil
}

func (presigner AzPresigner) Delete(ctx context.Context, objectKey string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(bucketName).NewBlobClient(objectKey)

	permissions := sas.BlobPermissions{Delete: true}
	expiry := time.Now().Add(expires).UTC()

	sasURL, err := blobClient.GetSASURL(permissions, expiry, nil)
	if err != nil {
		return "", err
	}

	return sasURL, nil
}

func NewAz() (*AzPresigner, error) {
	if azure := config.Config.FileStorage.Azure; azure != nil {
		cred, err := azidentity.NewClientSecretCredential(
			azure.TenantId,
			azure.ClientId,
			azure.ClientSecret,
			nil,
		)
		if err != nil {
			return nil, err
		}

		serviceUrl := fmt.Sprintf("https://%s.blob.core.windows.net/", azure.AccountName)
		client, err := azblob.NewClient(serviceUrl, cred, nil)
		if err != nil {
			return nil, err
		}

		return &AzPresigner{Client: client}, nil
	}

	return nil, nil
}
