package fileserver

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

var (
	bucketName = "athena_storage"
	expires    = time.Minute * 15
)

func Run() error {
	app := fiber.New()
	s3Presigner := NewS3()
	azPresigner, _ := NewAz()
	gcpPresigner, _ := NewGCP()

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

	return app.Listen(":3000")
}
