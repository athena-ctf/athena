package storage

import (
	"context"

	"athena.io/config"
)

type Storage interface {
	Download(ctx context.Context, filename, displayName string) (string, error)
	Upload(ctx context.Context, filename string) (string, error)
	Delete(ctx context.Context, filename string) (string, error)
}

type Storages = map[string]Storage

func Register() (Storages, error) {
	storages := make(Storages)
	var err error

	if azure := config.Config.FileStorage.Azure; azure != nil {
		storages["azure"], err = NewAz(azure)

		if err != nil {
			return nil, err
		}
	}

	if s3cfg := config.Config.FileStorage.Aws; s3cfg != nil {
		storages["s3"] = NewS3(&s3cfg)
	}

	if gcp := config.Config.FileStorage.Gcp; gcp != nil {
		storages["gcp"], err = NewGCP(&gcp)

		if err != nil {
			return nil, err
		}
	}

	return storages, nil
}
