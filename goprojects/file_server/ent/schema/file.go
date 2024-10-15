package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// File holds the schema definition for the File entity.
type File struct {
	ent.Schema
}

// Fields of the File.
func (File) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.New()),
		field.Time("created_at"),
		field.Time("updated_at"),
		field.String("name"),
		field.Enum("backend").Values("local", "s3", "azure", "gcp"),
		field.UUID("challenge_id", uuid.New()),
	}
}

// Edges of the File.
func (File) Edges() []ent.Edge {
	return nil
}
