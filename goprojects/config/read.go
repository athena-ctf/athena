package config

import (
	"log"

	"github.com/spf13/viper"
)

var Config Settings

func init() {
	v := viper.New()
	v.SetConfigName("config")
	v.SetConfigType("yaml")
	v.AddConfigPath(".")

	var config Settings
	if err := v.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %s", err)
	}

	if err := v.Unmarshal(&config); err != nil {
		log.Fatalf("Error unmarshalling config: %s", err)
	}
}
