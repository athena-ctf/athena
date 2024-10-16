package storage

import (
	"context"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
)

type GcpPresigner struct {
	Client *storage.Client
}

func (presigner GcpPresigner) Download(ctx context.Context, filename string) (string, error) {
	bucket := presigner.Client.Bucket(bucketName)

	opts := &storage.SignedURLOptions{
		Method:  "GET",
		Expires: time.Now().Add(expires),
	}

	url, err := bucket.SignedURL(filename, opts)
	if err != nil {
		return "", err
	}

	return url, nil
}

func (presigner GcpPresigner) Upload(ctx context.Context, filename string) (string, error) {
	bucket := presigner.Client.Bucket(bucketName)

	opts := &storage.SignedURLOptions{
		Method:  "PUT",
		Expires: time.Now().Add(expires),
	}

	url, err := bucket.SignedURL(filename, opts)
	if err != nil {
		return "", err
	}
	return url, nil
}

func (presigner GcpPresigner) Delete(ctx context.Context, filename string) (string, error) {
	bucket := presigner.Client.Bucket(bucketName)

	opts := &storage.SignedURLOptions{
		Method:  "DELETE",
		Expires: time.Now().Add(expires),
	}

	url, err := bucket.SignedURL(filename, opts)
	if err != nil {
		return "", err
	}

	return url, nil
}

func NewGCP() (GcpPresigner, error) {
	client, err := storage.NewClient(context.TODO(), option.WithCredentials(&google.Credentials{}))
	if err != nil {
		return GcpPresigner{}, err
	}

	return GcpPresigner{Client: client}, nil
}
