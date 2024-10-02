package db

import (
	"time"

	"github.com/google/uuid"
)

type Ban struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key"`
	DateCreated time.Time `gorm:"date_created"`
	Reason      string    `gorm:"not null"`
	Duration    int32     `gorm:"not null"`
}
