package db

import (
	"time"

	"github.com/google/uuid"
)

type Team struct {
	ID          uuid.UUID  `gorm:"type:uuid;primary_key"`
	DateCreated time.Time  `gorm:"date_created"`
	Email       string     `gorm:"unique"`
	Name        string     `gorm:"name"`
	BanID       *uuid.UUID `gorm:"type:uuid"`
	Players     []Player
}
