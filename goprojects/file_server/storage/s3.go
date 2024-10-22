package storage

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Presigner struct {
	PresignClient *s3.PresignClient
}

func (presigner S3Presigner) Download(ctx context.Context, filename string, displayName string) (string, error) {
	request, err := presigner.PresignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket:                     aws.String(bucketName),
		Key:                        aws.String(filename),
		ResponseContentDisposition: aws.String(fmt.Sprintf("attachment;filename=\"%s\"", displayName)),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = expires
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func (presigner S3Presigner) Upload(ctx context.Context, filename string) (string, error) {
	request, err := presigner.PresignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filename),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = expires
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func (presigner S3Presigner) Delete(ctx context.Context, filename string) (string, error) {
	request, err := presigner.PresignClient.PresignDeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filename),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = expires
	})

	if err != nil {
		return "", err
	}

	return request.URL, nil
}

func NewS3() S3Presigner {
	s3Client := s3.NewFromConfig(aws.Config{})
	presignClient := s3.NewPresignClient(s3Client)

	return S3Presigner{PresignClient: presignClient}
}
