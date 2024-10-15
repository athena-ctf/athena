package fileserver

import (
	"context"
	"log"
	"time"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/sas"
)

type AzPresigner struct {
	Client *azblob.Client
}

func (presigner AzPresigner) Download(ctx context.Context, filename string) (string, error) {
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

func NewAz() (AzPresigner, error) {
	// TODO: add connection string
	client, err := azblob.NewClientFromConnectionString("", nil)
	if err != nil {
		log.Printf("Couldn't create Azure Blob Storage client. Here's why: %v\n", err)
		return AzPresigner{}, err
	}

	return AzPresigner{Client: client}, nil
}
