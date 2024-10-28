package fileserver

import (
	"compress/gzip"
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

var notConfiguredError = errors.New("store not configured")

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
	db           *ent.Client
	s3Presigner  *storage.S3Presigner
	azPresigner  *storage.AzPresigner
	gcpPresigner *storage.GcpPresigner
}

func NewHandler(db *ent.Client, s3Presigner *storage.S3Presigner, azPresigner *storage.AzPresigner, gcpPresigner *storage.GcpPresigner) Handler {
	return Handler{db, s3Presigner, azPresigner, gcpPresigner}
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
				case config.CompressionBr:
					if c.AcceptsEncodings("br") == "br" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.br", id))
					}
				case config.CompressionGzip:
					if c.AcceptsEncodings("gzip") == "gzip" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.gz", id))
					}
				case config.CompressionZstd:
					if c.AcceptsEncodings("zstd") == "zstd" {
						filepath = path.Join(local.Path, fmt.Sprintf("%s.zstd", id))
					}
				}
			} else {
				filepath = path.Join(local.Path, id)
			}

			return c.Download(filepath, model.Name)
		} else {
			return notConfiguredError
		}
	case file.BackendAzure:
		if handler.azPresigner != nil {
			url, err = handler.azPresigner.Download(ctx, id, model.Name)
		} else {
			return notConfiguredError
		}
	case file.BackendGcp:
		if handler.gcpPresigner != nil {
			url, err = handler.gcpPresigner.Download(ctx, id, model.Name)
		} else {
			return notConfiguredError
		}
	case file.BackendS3:
		if handler.s3Presigner != nil {
			url, err = handler.s3Presigner.Download(ctx, id, model.Name)
		} else {
			return notConfiguredError
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
				case config.CompressionBr:
					filepaths = append(filepaths, path.Join(local.Path, fmt.Sprintf("%s.br", id)))
				case config.CompressionGzip:
					filepaths = append(filepaths, path.Join(local.Path, fmt.Sprintf("%s.gz", id)))
				case config.CompressionZstd:
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
			return notConfiguredError
		}
	case file.BackendAzure:
		if handler.azPresigner != nil {
			url, err = handler.azPresigner.Delete(ctx, id)
		} else {
			return notConfiguredError
		}
	case file.BackendGcp:
		if handler.gcpPresigner != nil {
			url, err = handler.gcpPresigner.Delete(ctx, id)
		} else {
			return notConfiguredError
		}
	case file.BackendS3:
		if handler.s3Presigner != nil {
			url, err = handler.s3Presigner.Delete(ctx, id)
		} else {
			return notConfiguredError
		}
	}

	if err != nil {
		return err
	}

	return c.Redirect(url)
}

func (handler Handler) Upload(c *fiber.Ctx) error {
	location := c.Params("id")
	name, err := uuid.NewV7()
	if err != nil {
		return err
	}

	var url string

	switch location {
	case "local":
		if local := config.Config.FileStorage.Local; local != nil {
			file, err := c.FormFile("file")
			if err != nil {
				return err
			}

			if err := c.SaveFile(file, name.String()); err != nil {
				return err
			}

			if compress := local.Compress; compress != nil {
				openedFile, err := file.Open()
				if err != nil {
					return err
				}

				switch *compress {
				case config.CompressionBr:
					compressBrotli(local.Path, name.String(), openedFile)
				case config.CompressionZstd:
					compressZstd(local.Path, name.String(), openedFile)
				case config.CompressionGzip:
					compressGzip(local.Path, name.String(), openedFile)
				}
			}

			return c.JSON(map[string]string{"status": "successfully uploaded"})
		} else {
			return notConfiguredError
		}
	case "s3":
		if handler.s3Presigner != nil {
			url, err = handler.s3Presigner.Upload(c.Context(), name.String())
		} else {
			return notConfiguredError
		}
	case "azure":
		if handler.azPresigner != nil {
			url, err = handler.azPresigner.Upload(c.Context(), name.String())
		} else {
			return notConfiguredError
		}
	case "gcp":
		if handler.gcpPresigner != nil {
			url, err = handler.gcpPresigner.Upload(c.Context(), name.String())
		} else {
			return notConfiguredError
		}
	default:
		return errors.New("invalid storage location")
	}

	if err != nil {
		return err
	}

	return c.JSON(map[string]string{"url": url})
}
