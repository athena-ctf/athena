package main

import (
	"log"

	"athena.io/fileserver"
	"athena.io/fileserver/ent"
)

func main() {
	client, err := ent.Open("postgres", "host=<host> port=<port> user=<user> dbname=<database> password=<pass>")
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	if err := fileserver.Run(); err != nil {
		log.Fatalf("err: %v", err)
	}
}
