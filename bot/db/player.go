package db

import (
	"time"

	"github.com/google/uuid"
)

type Player struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key"`
	DateCreated time.Time  `gorm:"date_created"`
	Username    string     `gorm:"unique"`
	Email       string     `gorm:"unique"`
	Password    string     `gorm:"not null"`
	DisplayName string     `gorm:"displayName"`
	Verified    bool       `gorm:"verified"`
	TeamID      *uuid.UUID `gorm:"type:uuid"`
	BanID       *uuid.UUID `gorm:"type:uuid"`
	DiscordID   *string    `gorm:"unique"`
}
