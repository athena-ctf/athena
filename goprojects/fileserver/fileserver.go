package fileserver

import (
	"context"
	"fmt"
	"mime/multipart"
	"net/http"

	"athena.io/config"
	"athena.io/ent"
	"athena.io/fileserver/storage"
	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humafiber"
	"github.com/gofiber/fiber/v2"

	_ "github.com/danielgtaylor/huma/v2/formats/cbor"
)

func Run() error {
	app := fiber.New()
	api := humafiber.New(app, huma.DefaultConfig("Athena File Server", "1.0.0"))

	client, err := ent.Open(
		"postgres",
		fmt.Sprintf(
			"host=%s port=%d user=%s dbname=athena_db password=%s",
			config.Config.Database.Host,
			config.Config.Database.Port,
			config.Config.Database.Username,
			config.Config.Database.Password,
		),
	)
	if err != nil {
		return err
	}
	defer client.Close()

	storages, err := storage.Register()
	if err != nil {
		return err
	}

	fileHandler := NewHandler(client, storages)

	huma.Register(
		api,
		huma.Operation{
			OperationID: "upload_file",
			Method:      http.MethodPost,
			Path:        "/upload/{location}",
			Summary:     "Upload a file to specified location",
		},
		func(ctx context.Context, i *struct {
			Location string `path:"location" enum:"local,azure,s3,gcp"`
			Body     multipart.Form
		}) (*UploadResponse, error) {
			return fileHandler.Upload(ctx, i.Location, i.Body.File["file"][0])
		},
	)

	app.Get("/download/:id", fileHandler.Download)
	app.Delete("/delete/:id", fileHandler.Delete)

	return app.Listen(":3000")
}
