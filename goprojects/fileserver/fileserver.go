package fileserver

import (
	"fmt"

	"athena.io/config"
	"athena.io/ent"
	"athena.io/fileserver/storage"
	"github.com/gofiber/fiber/v2"
)

func Run() error {
	app := fiber.New()
	s3Presigner := storage.NewS3()
	azPresigner, err := storage.NewAz()
	if err != nil {
		return err
	}

	gcpPresigner, err := storage.NewGCP()
	if err != nil {
		return err
	}

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

	fileHandler := NewHandler(client, s3Presigner, azPresigner, gcpPresigner)
	app.Post("/upload/:location", fileHandler.Upload)
	app.Get("/download/:id", fileHandler.Download)
	app.Delete("/delete/:id", fileHandler.Delete)

	return app.Listen(":3000")
}
