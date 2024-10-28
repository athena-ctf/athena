package storage

import (
	"context"
	"fmt"
	"time"

	"athena.io/config"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/sas"
)

type AzPresigner struct {
	Client *azblob.Client
}

func (presigner AzPresigner) Download(ctx context.Context, filename, displayName string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(config.Config.FileStorage.RemoteStorageOptions.BucketName).NewBlobClient(filename)

	permissions := sas.BlobPermissions{Read: true}
	expiry := time.Now().Add(time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)).UTC()

	urlParts, err := azblob.ParseURL(blobClient.URL())
	if err != nil {
		return "", err
	}

	t, err := time.Parse(blob.SnapshotTimeFormat, urlParts.Snapshot)
	if err != nil {
		t = time.Time{}
	}

	creds, err := azblob.NewSharedKeyCredential(config.Config.FileStorage.Azure.AccountName, config.Config.FileStorage.Azure.AccountKey)
	if err != nil {
		return "", err
	}

	qps, err := sas.BlobSignatureValues{
		ContainerName:      urlParts.ContainerName,
		BlobName:           urlParts.BlobName,
		SnapshotTime:       t,
		Version:            sas.Version,
		Permissions:        permissions.String(),
		ExpiryTime:         expiry.UTC(),
		ContentDisposition: fmt.Sprintf("attachment; filename=\"%s\"", displayName),
	}.SignWithSharedKey(creds)

	if err != nil {
		return "", err
	}

	endpoint := blobClient.URL() + "?" + qps.Encode()
	return endpoint, nil

}

func (presigner AzPresigner) Upload(ctx context.Context, filename string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(config.Config.FileStorage.RemoteStorageOptions.BucketName).NewBlobClient(filename)

	permissions := sas.BlobPermissions{Write: true}
	expiry := time.Now().Add(time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)).UTC()

	sasURL, err := blobClient.GetSASURL(permissions, expiry, nil)
	if err != nil {
		return "", err
	}

	return sasURL, nil
}

func (presigner AzPresigner) Delete(ctx context.Context, objectKey string) (string, error) {
	blobClient := presigner.Client.ServiceClient().NewContainerClient(config.Config.FileStorage.RemoteStorageOptions.BucketName).NewBlobClient(objectKey)

	permissions := sas.BlobPermissions{Delete: true}
	expiry := time.Now().Add(time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)).UTC()

	sasURL, err := blobClient.GetSASURL(permissions, expiry, nil)
	if err != nil {
		return "", err
	}

	return sasURL, nil
}

func NewAz() (*AzPresigner, error) {
	if azure := config.Config.FileStorage.Azure; azure != nil {
		serviceUrl := fmt.Sprintf("https://%s.blob.core.windows.net/", azure.AccountName)
		cred, err := azblob.NewSharedKeyCredential(config.Config.FileStorage.Azure.AccountName, config.Config.FileStorage.Azure.AccountKey)
		if err != nil {
			return nil, err
		}

		client, err := azblob.NewClientWithSharedKeyCredential(serviceUrl, cred, nil)
		if err != nil {
			return nil, err
		}
		return &AzPresigner{Client: client}, nil
	}

	return nil, nil
}
