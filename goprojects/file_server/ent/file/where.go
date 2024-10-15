// Code generated by ent, DO NOT EDIT.

package file

import (
	"time"

	"athena.io/fileserver/ent/predicate"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.File {
	return predicate.File(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.File {
	return predicate.File(sql.FieldLTE(FieldID, id))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.File {
	return predicate.File(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.File {
	return predicate.File(sql.FieldEQ(FieldUpdatedAt, v))
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.File {
	return predicate.File(sql.FieldEQ(FieldName, v))
}

// ChallengeID applies equality check predicate on the "challenge_id" field. It's identical to ChallengeIDEQ.
func ChallengeID(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldEQ(FieldChallengeID, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.File {
	return predicate.File(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.File {
	return predicate.File(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.File {
	return predicate.File(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.File {
	return predicate.File(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.File {
	return predicate.File(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.File {
	return predicate.File(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.File {
	return predicate.File(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.File {
	return predicate.File(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.File {
	return predicate.File(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.File {
	return predicate.File(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.File {
	return predicate.File(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.File {
	return predicate.File(sql.FieldLTE(FieldUpdatedAt, v))
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.File {
	return predicate.File(sql.FieldEQ(FieldName, v))
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldName, v))
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.File {
	return predicate.File(sql.FieldIn(FieldName, vs...))
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldName, vs...))
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.File {
	return predicate.File(sql.FieldGT(FieldName, v))
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.File {
	return predicate.File(sql.FieldGTE(FieldName, v))
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.File {
	return predicate.File(sql.FieldLT(FieldName, v))
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.File {
	return predicate.File(sql.FieldLTE(FieldName, v))
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.File {
	return predicate.File(sql.FieldContains(FieldName, v))
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.File {
	return predicate.File(sql.FieldHasPrefix(FieldName, v))
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.File {
	return predicate.File(sql.FieldHasSuffix(FieldName, v))
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.File {
	return predicate.File(sql.FieldEqualFold(FieldName, v))
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.File {
	return predicate.File(sql.FieldContainsFold(FieldName, v))
}

// BackendEQ applies the EQ predicate on the "backend" field.
func BackendEQ(v Backend) predicate.File {
	return predicate.File(sql.FieldEQ(FieldBackend, v))
}

// BackendNEQ applies the NEQ predicate on the "backend" field.
func BackendNEQ(v Backend) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldBackend, v))
}

// BackendIn applies the In predicate on the "backend" field.
func BackendIn(vs ...Backend) predicate.File {
	return predicate.File(sql.FieldIn(FieldBackend, vs...))
}

// BackendNotIn applies the NotIn predicate on the "backend" field.
func BackendNotIn(vs ...Backend) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldBackend, vs...))
}

// ChallengeIDEQ applies the EQ predicate on the "challenge_id" field.
func ChallengeIDEQ(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldEQ(FieldChallengeID, v))
}

// ChallengeIDNEQ applies the NEQ predicate on the "challenge_id" field.
func ChallengeIDNEQ(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldNEQ(FieldChallengeID, v))
}

// ChallengeIDIn applies the In predicate on the "challenge_id" field.
func ChallengeIDIn(vs ...uuid.UUID) predicate.File {
	return predicate.File(sql.FieldIn(FieldChallengeID, vs...))
}

// ChallengeIDNotIn applies the NotIn predicate on the "challenge_id" field.
func ChallengeIDNotIn(vs ...uuid.UUID) predicate.File {
	return predicate.File(sql.FieldNotIn(FieldChallengeID, vs...))
}

// ChallengeIDGT applies the GT predicate on the "challenge_id" field.
func ChallengeIDGT(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldGT(FieldChallengeID, v))
}

// ChallengeIDGTE applies the GTE predicate on the "challenge_id" field.
func ChallengeIDGTE(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldGTE(FieldChallengeID, v))
}

// ChallengeIDLT applies the LT predicate on the "challenge_id" field.
func ChallengeIDLT(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldLT(FieldChallengeID, v))
}

// ChallengeIDLTE applies the LTE predicate on the "challenge_id" field.
func ChallengeIDLTE(v uuid.UUID) predicate.File {
	return predicate.File(sql.FieldLTE(FieldChallengeID, v))
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.File) predicate.File {
	return predicate.File(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.File) predicate.File {
	return predicate.File(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.File) predicate.File {
	return predicate.File(sql.NotPredicates(p))
}
