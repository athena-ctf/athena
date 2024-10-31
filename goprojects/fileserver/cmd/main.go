package main

import (
	"log"

	"athena.io/fileserver"
)

func main() {
	if err := fileserver.Run(); err != nil {
		log.Fatalf("err: %v", err)
	}
}
