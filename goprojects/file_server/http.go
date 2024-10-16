package fileserver

import (
	"fmt"

	"athena.io/fileserver/ent"
	"athena.io/fileserver/handler"
	"athena.io/fileserver/storage"
	jwt "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
)

func Run() error {
	app := fiber.New()
	s3Presigner := storage.NewS3()
	azPresigner, _ := storage.NewAz()
	gcpPresigner, _ := storage.NewGCP()

	client, err := ent.Open("postgres", "host=<host> port=<port> user=<user> dbname=<database> password=<pass>")
	if err != nil {
		return err
	}
	defer client.Close()

	fileHandler := handler.New(client, &s3Presigner, &azPresigner, &gcpPresigner)

	app.Use(jwt.New(jwt.Config{
		SigningKey: jwt.SigningKey{Key: []byte("secret")},
	}))

	app.Post("/upload/local", func(c *fiber.Ctx) error {
		file, err := c.FormFile("document")
		if err != nil {
			return err
		}

		// TODO: handle file location and hashing
		return c.SaveFile(file, fmt.Sprintf("./%s", file.Filename))
	})

	app.Get("/upload/azure", func(c *fiber.Ctx) error {
		url, err := azPresigner.Upload(c.Context(), c.Get("filename", ""))

		if err != nil {
			return c.Status(501).JSON(map[string]string{"err": err.Error()})
		}

		return c.JSON(map[string]string{"url": url})
	})

	app.Get("/upload/gcp", func(c *fiber.Ctx) error {
		url, err := gcpPresigner.Upload(c.Context(), c.Get("filename", ""))

		if err != nil {
			return c.Status(501).JSON(map[string]string{"err": err.Error()})
		}

		return c.JSON(map[string]string{"url": url})
	})

	app.Get("/upload/s3", func(c *fiber.Ctx) error {
		url, err := s3Presigner.Upload(c.Context(), c.Get("filename", ""))

		if err != nil {
			return c.Status(501).JSON(map[string]string{"err": err.Error()})
		}

		return c.JSON(map[string]string{"url": url})
	})

	app.Get("/download/:id", fileHandler.Download)

	return app.Listen(":3000")
}
