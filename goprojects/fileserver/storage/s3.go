package storage

import (
	"context"
	"fmt"
	"time"

	"athena.io/config"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Presigner struct {
	PresignClient *s3.PresignClient
}

func (presigner S3Presigner) Download(ctx context.Context, filename, displayName string) (string, error) {
	request, err := presigner.PresignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket:                     aws.String(config.Config.FileStorage.RemoteStorageOptions.BucketName),
		Key:                        aws.String(filename),
		ResponseContentDisposition: aws.String(fmt.Sprintf("attachment; filename=\"%s\"", displayName)),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func (presigner S3Presigner) Upload(ctx context.Context, filename string) (string, error) {
	request, err := presigner.PresignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(config.Config.FileStorage.RemoteStorageOptions.BucketName),
		Key:    aws.String(filename),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func (presigner S3Presigner) Delete(ctx context.Context, filename string) (string, error) {
	request, err := presigner.PresignClient.PresignDeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(config.Config.FileStorage.RemoteStorageOptions.BucketName),
		Key:    aws.String(filename),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Minute * time.Duration(config.Config.FileStorage.RemoteStorageOptions.Expires)
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func NewS3() *S3Presigner {
	if s3cfg := config.Config.FileStorage.Aws; s3cfg != nil {
		s3Client := s3.NewFromConfig(aws.Config{})
		presignClient := s3.NewPresignClient(s3Client)

		return &S3Presigner{PresignClient: presignClient}
	}

	return nil
}
