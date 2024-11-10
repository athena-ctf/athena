package main

import (
	"flag"
	"log"

	"athena.io/config"
	"athena.io/fileserver"
)

var filePath string

func init() {
	flag.StringVar(&filePath, "path", "", "path to config file")
}

func main() {
	flag.Parse()

	if err := config.Read(filePath); err != nil {
		log.Fatalf("could not read config: %v", err)
	}

	if err := fileserver.Run(); err != nil {
		log.Fatalf("err: %v", err)
	}
}
