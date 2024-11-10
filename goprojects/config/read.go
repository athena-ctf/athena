package config

import (
	"encoding/json"
	"os"
)

//go:generate go-jsonschema ../../data/config.schema.json -o config.go -p config --only-models -t --tags json
var Config Settings

func Read(path string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	return json.Unmarshal(data, &Config)
}
