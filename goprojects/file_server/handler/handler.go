package handler

import (
	"context"

	"athena.io/fileserver/ent"
	"athena.io/fileserver/ent/file"
	"athena.io/fileserver/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Handler struct {
	db           *ent.Client
	s3Presigner  *storage.S3Presigner
	azPresigner  *storage.AzPresigner
	gcpPresigner *storage.GcpPresigner
}

func (handler Handler) Download(c *fiber.Ctx) error {
	ctx := context.Background()
	model, err := handler.db.File.Get(ctx, uuid.MustParse(c.Params("id")))
	if err != nil {
		return err
	}

	var url string

	switch model.Backend {
	case file.BackendLocal:
		// TODO: handle other formats and 404 errors
		if c.AcceptsEncodings("gzip") == "gzip" {
			filename := model.Name + ".gz"
			c.Set("Content-Encoding", "gzip")
			return c.SendFile(filename)
		}
	case file.BackendAzure:
		url, err = handler.azPresigner.Download(ctx, model.Name)
	case file.BackendGcp:
		url, err = handler.gcpPresigner.Download(ctx, model.Name)
	case file.BackendS3:
		url, err = handler.s3Presigner.Download(ctx, model.Name)
	}

	if err != nil {
		return err
	}

	return c.Redirect(url)
}

func New(client *ent.Client, s3Presigner *storage.S3Presigner, azPresigner *storage.AzPresigner, gcpPresigner *storage.GcpPresigner) Handler {
	return Handler{client, s3Presigner, azPresigner, gcpPresigner}
}
