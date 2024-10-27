package config

import (
	"net/mail"
	"time"
)

type Ctf struct {
	Name        string               `json:"name"`
	Domain      string               `json:"domain"`
	Description string               `json:"description"`
	Time        Time                 `json:"time"`
	Challenge   *Challenge           `json:"challenge,omitempty"`
	Sponsors    map[string][]Sponsor `json:"sponsors"`
	Prizes      map[string][]string  `json:"prizes"`
}

type Sponsor struct {
	Name string `json:"name"`
	Logo string `json:"logo"`
}

type Time struct {
	Span   time.Duration `json:"span"`
	Start  time.Time     `json:"start"`
	Freeze time.Duration `json:"freeze"`
}

type Database struct {
	Host     string `json:"host"`
	Port     uint16 `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type RedisInner struct {
	Host     string `json:"host"`
	Port     uint16 `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Redis struct {
	Cache RedisInner `json:"cache"`
	Token RedisInner `json:"token"`
}

type AwsS3 struct {
	Region          string `json:"region" default:"ap-south-1"`
	AccessKeyID     string `json:"access_key_id"`
	SecretAccessKey string `json:"secret_access_key"`
	BucketName      string `json:"bucket_name"`
}

type Jwt struct {
	Secret              string `json:"secret"`
	AccessTokenTimeout  uint64 `json:"access_token_timeout"`
	RefreshTokenTimeout uint64 `json:"refresh_token_timeout"`
}

type CompressionKind string

const (
	CompressionGzip CompressionKind = "gzip"
	CompressionZstd CompressionKind = "zstd"
	CompressionBr   CompressionKind = "br"
)

type Local struct {
	Compress *CompressionKind `json:"compress,omitempty"`
	Path     string           `json:"path"`
}

type Aws struct {
}

type Gcp struct {
}

type Azure struct {
	AccountName  string `json:"account_name"`
	ClientId     string `json:"client_id"`
	TenantId     string `json:"tenant_id"`
	ClientSecret string `json:"client_secret"`
}

type FileStorage struct {
	Local *Local `json:"local,omitempty"`
	Aws   *Aws   `json:"aws,omitempty"`
	Gcp   *Gcp   `json:"gcp,omitempty"`
	Azure *Azure `json:"azure,omitempty"`
}

type Smtp struct {
	From      mail.Address `json:"from"`
	ReplyTo   mail.Address `json:"reply_to"`
	Username  string       `json:"username"`
	Password  string       `json:"password"`
	ServerURL string       `json:"server_url"`
}

type Challenge struct {
	MaxAttempts uint `json:"max_attempts"`
}

type Docker struct {
	SingleInstanceDuration uint   `json:"single_instance_duration"`
	RegistryURL            string `json:"registry_url"`
	RegistryUsername       string `json:"registry_username"`
	RegistryPassword       string `json:"registry_password"`
}

type Discord struct {
	WelcomeChannelID      string `json:"welcome_channel_id"`
	EditorRoleID          string `json:"editor_role_id"`
	ViewerRoleID          string `json:"viewer_role_id"`
	ReactionRoleMessageID string `json:"reaction_role_message_id"`
	LogsChannelID         string `json:"logs_channel_id"`
	GeneralChannelID      string `json:"general_channel_id"`
	BotToken              string `json:"bot_token"`
}

type Settings struct {
	Ctf         Ctf         `json:"ctf"`
	Database    Database    `json:"database"`
	Redis       Redis       `json:"redis"`
	FileStorage FileStorage `json:"file_storage"`
	Jwt         Jwt         `json:"jwt"`
	Smtp        Smtp        `json:"smtp"`
	Docker      Docker      `json:"docker"`
	Discord     Discord     `json:"discord"`
}
