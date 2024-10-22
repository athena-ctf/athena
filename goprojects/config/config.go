package config

import (
	"net/mail"
	"time"
)

type Ctf struct {
	Name        string               `json:"name" yaml:"name" toml:"name"`
	Domain      string               `json:"domain" yaml:"domain" toml:"domain"`
	Description string               `json:"description" yaml:"description" toml:"description"`
	Time        Time                 `json:"time" yaml:"time" toml:"time"`
	Challenge   *Challenge           `json:"challenge,omitempty" yaml:"challenge,omitempty" toml:"challenge,omitempty"`
	Sponsors    map[string][]Sponsor `json:"sponsors" yaml:"sponsors" toml:"sponsors"`
	Prizes      map[string][]string  `json:"prizes" yaml:"prizes" toml:"prizes"`
}

type Sponsor struct {
	Name string `json:"name" yaml:"name" toml:"name"`
	Logo string `json:"logo" yaml:"logo" toml:"logo"`
}

type Time struct {
	Span   time.Duration `json:"span" yaml:"span" toml:"span"`
	Start  time.Time     `json:"start" yaml:"start" toml:"start"`
	Freeze time.Duration `json:"freeze" yaml:"freeze" toml:"freeze"`
}

type Database struct {
	Host     string `json:"host" yaml:"host" toml:"host"`
	Port     uint16 `json:"port" yaml:"port" toml:"port"`
	Username string `json:"username" yaml:"username" toml:"username"`
	Password string `json:"password" yaml:"password" toml:"password"`
}

type RedisInner struct {
	Host     string `json:"host" yaml:"host" toml:"host"`
	Port     uint16 `json:"port" yaml:"port" toml:"port"`
	Username string `json:"username" yaml:"username" toml:"username"`
	Password string `json:"password" yaml:"password" toml:"password"`
}

type Redis struct {
	Cache RedisInner `json:"cache" yaml:"cache" toml:"cache"`
	Token RedisInner `json:"token" yaml:"token" toml:"token"`
}

type AwsS3 struct {
	Region          string `json:"region" yaml:"region" toml:"region" default:"ap-south-1"`
	AccessKeyID     string `json:"access_key_id" yaml:"access_key_id" toml:"access_key_id"`
	SecretAccessKey string `json:"secret_access_key" yaml:"secret_access_key" toml:"secret_access_key"`
	BucketName      string `json:"bucket_name" yaml:"bucket_name" toml:"bucket_name"`
}

type Jwt struct {
	Secret              string `json:"secret" yaml:"secret" toml:"secret"`
	AccessTokenTimeout  uint64 `json:"access_token_timeout" yaml:"access_token_timeout" toml:"access_token_timeout"`
	RefreshTokenTimeout uint64 `json:"refresh_token_timeout" yaml:"refresh_token_timeout" toml:"refresh_token_timeout"`
}

type CompressionKind string

const (
	CompressionGzip CompressionKind = "gzip"
	CompressionZstd CompressionKind = "zstd"
	CompressionBr   CompressionKind = "br"
)

type FileStorage struct {
	Compress *CompressionKind `json:"compress,omitempty" yaml:"compress,omitempty" toml:"compress,omitempty"`
	Path     string           `json:"path" yaml:"path" toml:"path"`
}

type Smtp struct {
	From      mail.Address `json:"from" yaml:"from" toml:"from"`
	ReplyTo   mail.Address `json:"reply_to" yaml:"reply_to" toml:"reply_to"`
	Username  string       `json:"username" yaml:"username" toml:"username"`
	Password  string       `json:"password" yaml:"password" toml:"password"`
	ServerURL string       `json:"server_url" yaml:"server_url" toml:"server_url"`
}

type Challenge struct {
	MaxAttempts uint `json:"max_attempts" yaml:"max_attempts" toml:"max_attempts"`
}

type Docker struct {
	SingleInstanceDuration uint   `json:"single_instance_duration" yaml:"single_instance_duration" toml:"single_instance_duration"`
	RegistryURL            string `json:"registry_url" yaml:"registry_url" toml:"registry_url"`
	RegistryUsername       string `json:"registry_username" yaml:"registry_username" toml:"registry_username"`
	RegistryPassword       string `json:"registry_password" yaml:"registry_password" toml:"registry_password"`
}

type Discord struct {
	WelcomeChannelID      string `json:"welcome_channel_id" yaml:"welcome_channel_id" toml:"welcome_channel_id"`
	EditorRoleID          string `json:"editor_role_id" yaml:"editor_role_id" toml:"editor_role_id"`
	ViewerRoleID          string `json:"viewer_role_id" yaml:"viewer_role_id" toml:"viewer_role_id"`
	ReactionRoleMessageID string `json:"reaction_role_message_id" yaml:"reaction_role_message_id" toml:"reaction_role_message_id"`
	LogsChannelID         string `json:"logs_channel_id" yaml:"logs_channel_id" toml:"logs_channel_id"`
	GeneralChannelID      string `json:"general_channel_id" yaml:"general_channel_id" toml:"general_channel_id"`
	BotToken              string `json:"bot_token" yaml:"bot_token" toml:"bot_token"`
}

type Settings struct {
	Ctf         Ctf         `json:"ctf" yaml:"ctf" toml:"ctf"`
	Database    Database    `json:"database" yaml:"database" toml:"database"`
	Redis       Redis       `json:"redis" yaml:"redis" toml:"redis"`
	FileStorage FileStorage `json:"file_storage" yaml:"file_storage" toml:"file_storage"`
	Jwt         Jwt         `json:"jwt" yaml:"jwt" toml:"jwt"`
	Smtp        Smtp        `json:"smtp" yaml:"smtp" toml:"smtp"`
	Docker      Docker      `json:"docker" yaml:"docker" toml:"docker"`
	Discord     Discord     `json:"discord" yaml:"discord" toml:"discord"`
}
