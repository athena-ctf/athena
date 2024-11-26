package fileserver

import (
	"compress/gzip"
	"context"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path"

	"athena.io/config"
	"athena.io/ent"
	"athena.io/ent/file"
	"athena.io/fileserver/storage"
	"github.com/andybalholm/brotli"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/klauspost/compress/zstd"
)

var errNotConfigured = errors.New("store not configured")
var errFileRequired = errors.New("file required for local uploads")

func createFile(basePath, name string) (*os.File, error) {
	return os.Create(path.Join(basePath, name))
}

func compressGzip(basePath, name string, multipartFile multipart.File) error {
	compressedFile, err := createFile(basePath, fmt.Sprintf("%s.gz", name))
	if err != nil {
		return err
	}
	defer compressedFile.Close()

	w := gzip.NewWriter(compressedFile)
	_, err = io.Copy(w, multipartFile)

	return err
}

func compressZstd(basePath, name string, multipartFile multipart.File) error {
	compressedFile, err := createFile(basePath, fmt.Sprintf("%s.zstd", name))
	if err != nil {
		return err
	}
	defer compressedFile.Close()

	w, err := zstd.NewWriter(compressedFile)
	if err != nil {
		return err
	}

	_, err = io.Copy(w, multipartFile)

	return err
}

func compressBrotli(basePath, name string, multipartFile multipart.File) error {
	compressedFile, err := createFile(basePath, fmt.Sprintf("%s.br", name))
	if err != nil {
		return err
	}
	defer compressedFile.Close()

	w := brotli.NewWriter(compressedFile)
	_, err = io.Copy(w, multipartFile)

	return err
}

type Handler struct {
	db       *ent.Client
	storages storage.Storages
}

func NewHandler(db *ent.Client, storages storage.Storages) Handler {
	return Handler{db, storages}
}

func (handler Handler) Download(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")
	parsedId, err := uuid.Parse(id)
	if err != nil {
		return err
	}

	model, err := handler.db.File.Get(ctx, parsedId)
	if err != nil {
		return err
	}

	var url string

	switch model.Backend {
	case file.BackendLocal:
		if local := config.Config.FileStorage.Local; local != nil {
			var filepath string
			if compress := local.Compress; compress != nil {
				switch *compress {
				case config.CompressionKindBr:
					if c.AcceptsEncodings("br") == "br" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.br", id))
					}
				case config.CompressionKindGzip:
					if c.AcceptsEncodings("gzip") == "gzip" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.gz", id))
					}
				case config.CompressionKindZstd:
					if c.AcceptsEncodings("zstd") == "zstd" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.zstd", id))
					}
				}
			} else {
				filepath = path.Join(local.Path, id)
			}

			return c.Download(filepath, model.Name)
		} else {
			return errNotConfigured
		}
	case file.BackendAzure:
		if presigner, ok := handler.storages["azure"]; ok {
			url, err = presigner.Download(ctx, id, model.Name)
		} else {
			return errNotConfigured
		}
	case file.BackendGcp:
		if presigner, ok := handler.storages["gcp"]; ok {
			url, err = presigner.Download(ctx, id, model.Name)
		} else {
			return errNotConfigured
		}
	case file.BackendS3:
		if presigner, ok := handler.storages["s3"]; ok {
			url, err = presigner.Download(ctx, id, model.Name)
		} else {
			return errNotConfigured
		}
	}

	if err != nil {
		return err
	}

	return c.Redirect(url)
}

func (handler Handler) Delete(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")
	parsedId, err := uuid.Parse(id)
	if err != nil {
		return err
	}

	model, err := handler.db.File.Get(ctx, parsedId)
	if err != nil {
		return err
	}

	var url string

	switch model.Backend {
	case file.BackendLocal:
		if local := config.Config.FileStorage.Local; local != nil {
			filepaths := []string{}
			if compress := local.Compress; compress != nil {
				switch *compress {
				case config.CompressionKindBr:
					filepaths = append(filepaths, path.Join(local.Path, fmt.Sprintf("%s.br", id)))
				case config.CompressionKindGzip:
					filepaths = append(filepaths, path.Join(local.Path, fmt.Sprintf("%s.gz", id)))
				case config.CompressionKindZstd:
					filepaths = append(filepaths, path.Join(local.Path, fmt.Sprintf("%s.zstd", id)))
				}
			} else {
				filepaths = append(filepaths, path.Join(local.Path, id))
			}

			for _, filepath := range filepaths {
				err := os.Remove(filepath)
				if err != nil {
					return err
				}
			}

			return c.SendStatus(fiber.StatusNoContent)
		} else {
			return errNotConfigured
		}
	case file.BackendAzure:
		if presigner, ok := handler.storages["azure"]; ok {
			url, err = presigner.Delete(ctx, id)
		} else {
			return errNotConfigured
		}
	case file.BackendGcp:
		if presigner, ok := handler.storages["gcp"]; ok {
			url, err = presigner.Delete(ctx, id)
		} else {
			return errNotConfigured
		}
	case file.BackendS3:
		if presigner, ok := handler.storages["s3"]; ok {
			url, err = presigner.Delete(ctx, id)
		} else {
			return errNotConfigured
		}
	}

	if err != nil {
		return err
	}

	return c.Redirect(url)
}

type UploadResponse struct {
	message string
}

func (handler Handler) Upload(ctx context.Context, location string, file *multipart.FileHeader) (*UploadResponse, error) {
	name, err := uuid.NewV7()
	if err != nil {
		return nil, err
	}

	var url string

	switch location {
	case "local":
		if local := config.Config.FileStorage.Local; local != nil {
			if file == nil {
				return nil, errFileRequired
			}

			if compress := local.Compress; compress != nil {
				openedFile, err := file.Open()
				if err != nil {
					return nil, err
				}

				switch *compress {
				case config.CompressionKindBr:
					compressBrotli(local.Path, name.String(), openedFile)
				case config.CompressionKindZstd:
					compressZstd(local.Path, name.String(), openedFile)
				case config.CompressionKindGzip:
					compressGzip(local.Path, name.String(), openedFile)
				}
			}

			return &UploadResponse{"successfully uploaded"}, nil
		} else {
			return nil, errNotConfigured
		}
	default:
		if presigner, ok := handler.storages[location]; ok {
			url, err = presigner.Upload(ctx, name.String())
		} else {
			return nil, errNotConfigured
		}
	}

	if err != nil {
		return nil, err
	}

	return &UploadResponse{url}, nil
}
