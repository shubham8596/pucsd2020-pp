package repository

import (
	"context"
)

type IRepository interface {
	GetByID(context.Context, int64) (interface{}, error)
	GetByEmail(context.Context, string) (interface{}, error)
	Create(context.Context, interface{}) (interface{}, error)
	Update(context.Context, interface{}) (interface{}, error)
	Delete(context.Context, int64) error
	GetAll(context.Context) ([]interface{}, error)
}

type Repository struct {
}

func (repo *Repository) GetByID(cntx context.Context, id int64) (obj interface{}, err error) {
	return
}

func (repo *Repository) GetByEmail(cntx context.Context, email string) (obj interface{}, err error) {
	return
}


func (repo *Repository) Create(cntx context.Context, obj interface{}) (cobj interface{}, err error) {
	return
}

func (repo *Repository) Update(cntx context.Context, obj interface{}) (uobj interface{}, err error) {
	return
}

func (repo *Repository) Delete(cntx context.Context, id int64) (deleted bool, err error) {
	return
}

func (repo *Repository) GetAll(cntx context.Context) (obj []interface{}, err error) {
	return
}
