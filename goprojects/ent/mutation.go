// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"

	"athena.io/ent/file"
	"athena.io/ent/predicate"
	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
)

const (
	// Operation types.
	OpCreate    = ent.OpCreate
	OpDelete    = ent.OpDelete
	OpDeleteOne = ent.OpDeleteOne
	OpUpdate    = ent.OpUpdate
	OpUpdateOne = ent.OpUpdateOne

	// Node types.
	TypeFile = "File"
)

// FileMutation represents an operation that mutates the File nodes in the graph.
type FileMutation struct {
	config
	op            Op
	typ           string
	id            *uuid.UUID
	created_at    *time.Time
	updated_at    *time.Time
	name          *string
	backend       *file.Backend
	clearedFields map[string]struct{}
	done          bool
	oldValue      func(context.Context) (*File, error)
	predicates    []predicate.File
}

var _ ent.Mutation = (*FileMutation)(nil)

// fileOption allows management of the mutation configuration using functional options.
type fileOption func(*FileMutation)

// newFileMutation creates new mutation for the File entity.
func newFileMutation(c config, op Op, opts ...fileOption) *FileMutation {
	m := &FileMutation{
		config:        c,
		op:            op,
		typ:           TypeFile,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withFileID sets the ID field of the mutation.
func withFileID(id uuid.UUID) fileOption {
	return func(m *FileMutation) {
		var (
			err   error
			once  sync.Once
			value *File
		)
		m.oldValue = func(ctx context.Context) (*File, error) {
			once.Do(func() {
				if m.done {
					err = errors.New("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().File.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withFile sets the old File of the mutation.
func withFile(node *File) fileOption {
	return func(m *FileMutation) {
		m.oldValue = func(context.Context) (*File, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m FileMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m FileMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, errors.New("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// SetID sets the value of the id field. Note that this
// operation is only accepted on creation of File entities.
func (m *FileMutation) SetID(id uuid.UUID) {
	m.id = &id
}

// ID returns the ID value in the mutation. Note that the ID is only available
// if it was provided to the builder or after it was returned from the database.
func (m *FileMutation) ID() (id uuid.UUID, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// IDs queries the database and returns the entity ids that match the mutation's predicate.
// That means, if the mutation is applied within a transaction with an isolation level such
// as sql.LevelSerializable, the returned ids match the ids of the rows that will be updated
// or updated by the mutation.
func (m *FileMutation) IDs(ctx context.Context) ([]uuid.UUID, error) {
	switch {
	case m.op.Is(OpUpdateOne | OpDeleteOne):
		id, exists := m.ID()
		if exists {
			return []uuid.UUID{id}, nil
		}
		fallthrough
	case m.op.Is(OpUpdate | OpDelete):
		return m.Client().File.Query().Where(m.predicates...).IDs(ctx)
	default:
		return nil, fmt.Errorf("IDs is not allowed on %s operations", m.op)
	}
}

// SetCreatedAt sets the "created_at" field.
func (m *FileMutation) SetCreatedAt(t time.Time) {
	m.created_at = &t
}

// CreatedAt returns the value of the "created_at" field in the mutation.
func (m *FileMutation) CreatedAt() (r time.Time, exists bool) {
	v := m.created_at
	if v == nil {
		return
	}
	return *v, true
}

// OldCreatedAt returns the old "created_at" field's value of the File entity.
// If the File object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *FileMutation) OldCreatedAt(ctx context.Context) (v time.Time, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldCreatedAt is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldCreatedAt requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldCreatedAt: %w", err)
	}
	return oldValue.CreatedAt, nil
}

// ResetCreatedAt resets all changes to the "created_at" field.
func (m *FileMutation) ResetCreatedAt() {
	m.created_at = nil
}

// SetUpdatedAt sets the "updated_at" field.
func (m *FileMutation) SetUpdatedAt(t time.Time) {
	m.updated_at = &t
}

// UpdatedAt returns the value of the "updated_at" field in the mutation.
func (m *FileMutation) UpdatedAt() (r time.Time, exists bool) {
	v := m.updated_at
	if v == nil {
		return
	}
	return *v, true
}

// OldUpdatedAt returns the old "updated_at" field's value of the File entity.
// If the File object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *FileMutation) OldUpdatedAt(ctx context.Context) (v time.Time, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldUpdatedAt is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldUpdatedAt requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldUpdatedAt: %w", err)
	}
	return oldValue.UpdatedAt, nil
}

// ResetUpdatedAt resets all changes to the "updated_at" field.
func (m *FileMutation) ResetUpdatedAt() {
	m.updated_at = nil
}

// SetName sets the "name" field.
func (m *FileMutation) SetName(s string) {
	m.name = &s
}

// Name returns the value of the "name" field in the mutation.
func (m *FileMutation) Name() (r string, exists bool) {
	v := m.name
	if v == nil {
		return
	}
	return *v, true
}

// OldName returns the old "name" field's value of the File entity.
// If the File object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *FileMutation) OldName(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldName is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldName requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldName: %w", err)
	}
	return oldValue.Name, nil
}

// ResetName resets all changes to the "name" field.
func (m *FileMutation) ResetName() {
	m.name = nil
}

// SetBackend sets the "backend" field.
func (m *FileMutation) SetBackend(f file.Backend) {
	m.backend = &f
}

// Backend returns the value of the "backend" field in the mutation.
func (m *FileMutation) Backend() (r file.Backend, exists bool) {
	v := m.backend
	if v == nil {
		return
	}
	return *v, true
}

// OldBackend returns the old "backend" field's value of the File entity.
// If the File object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *FileMutation) OldBackend(ctx context.Context) (v file.Backend, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldBackend is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldBackend requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldBackend: %w", err)
	}
	return oldValue.Backend, nil
}

// ResetBackend resets all changes to the "backend" field.
func (m *FileMutation) ResetBackend() {
	m.backend = nil
}

// Where appends a list predicates to the FileMutation builder.
func (m *FileMutation) Where(ps ...predicate.File) {
	m.predicates = append(m.predicates, ps...)
}

// WhereP appends storage-level predicates to the FileMutation builder. Using this method,
// users can use type-assertion to append predicates that do not depend on any generated package.
func (m *FileMutation) WhereP(ps ...func(*sql.Selector)) {
	p := make([]predicate.File, len(ps))
	for i := range ps {
		p[i] = ps[i]
	}
	m.Where(p...)
}

// Op returns the operation name.
func (m *FileMutation) Op() Op {
	return m.op
}

// SetOp allows setting the mutation operation.
func (m *FileMutation) SetOp(op Op) {
	m.op = op
}

// Type returns the node type of this mutation (File).
func (m *FileMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *FileMutation) Fields() []string {
	fields := make([]string, 0, 4)
	if m.created_at != nil {
		fields = append(fields, file.FieldCreatedAt)
	}
	if m.updated_at != nil {
		fields = append(fields, file.FieldUpdatedAt)
	}
	if m.name != nil {
		fields = append(fields, file.FieldName)
	}
	if m.backend != nil {
		fields = append(fields, file.FieldBackend)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *FileMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case file.FieldCreatedAt:
		return m.CreatedAt()
	case file.FieldUpdatedAt:
		return m.UpdatedAt()
	case file.FieldName:
		return m.Name()
	case file.FieldBackend:
		return m.Backend()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *FileMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case file.FieldCreatedAt:
		return m.OldCreatedAt(ctx)
	case file.FieldUpdatedAt:
		return m.OldUpdatedAt(ctx)
	case file.FieldName:
		return m.OldName(ctx)
	case file.FieldBackend:
		return m.OldBackend(ctx)
	}
	return nil, fmt.Errorf("unknown File field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *FileMutation) SetField(name string, value ent.Value) error {
	switch name {
	case file.FieldCreatedAt:
		v, ok := value.(time.Time)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetCreatedAt(v)
		return nil
	case file.FieldUpdatedAt:
		v, ok := value.(time.Time)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetUpdatedAt(v)
		return nil
	case file.FieldName:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetName(v)
		return nil
	case file.FieldBackend:
		v, ok := value.(file.Backend)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetBackend(v)
		return nil
	}
	return fmt.Errorf("unknown File field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *FileMutation) AddedFields() []string {
	return nil
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *FileMutation) AddedField(name string) (ent.Value, bool) {
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *FileMutation) AddField(name string, value ent.Value) error {
	switch name {
	}
	return fmt.Errorf("unknown File numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *FileMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *FileMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *FileMutation) ClearField(name string) error {
	return fmt.Errorf("unknown File nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *FileMutation) ResetField(name string) error {
	switch name {
	case file.FieldCreatedAt:
		m.ResetCreatedAt()
		return nil
	case file.FieldUpdatedAt:
		m.ResetUpdatedAt()
		return nil
	case file.FieldName:
		m.ResetName()
		return nil
	case file.FieldBackend:
		m.ResetBackend()
		return nil
	}
	return fmt.Errorf("unknown File field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *FileMutation) AddedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *FileMutation) AddedIDs(name string) []ent.Value {
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *FileMutation) RemovedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *FileMutation) RemovedIDs(name string) []ent.Value {
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *FileMutation) ClearedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *FileMutation) EdgeCleared(name string) bool {
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *FileMutation) ClearEdge(name string) error {
	return fmt.Errorf("unknown File unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *FileMutation) ResetEdge(name string) error {
	return fmt.Errorf("unknown File edge %s", name)
}
