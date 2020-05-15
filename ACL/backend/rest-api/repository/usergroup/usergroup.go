package usergroup

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type usergroupRepository struct {
	conn *sql.DB
}

func NewUserGroupRepository(conn *sql.DB) *usergroupRepository {
	return &usergroupRepository{conn: conn}
}

func (usergroup *usergroupRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.UserGroup)
	return driver.GetById(usergroup.conn, obj, id)
}

func (usergroup *usergroupRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	usrgrp := obj.(model.UserGroup)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(usergroup.conn, &usrgrp)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	usrgrp.Id = id
	return id, nil
}

func (usergroup *usergroupRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	usrgrp := obj.(model.UserGroup)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(usergroup.conn, &usrgrp)
	return obj, err
}

func (usergroup *usergroupRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.UserGroup{Id: id}
	return driver.SoftDeleteById(usergroup.conn, obj, id)
}

func (usergroup *usergroupRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.UserGroup{}
	return driver.GetAll(usergroup.conn, obj, 0, 0)
}
