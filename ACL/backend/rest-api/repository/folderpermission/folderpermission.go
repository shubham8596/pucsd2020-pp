package folderpermission

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type folderpermissionRepository struct {
	conn *sql.DB
}

func NewFolderPermissionRepository(conn *sql.DB) *folderpermissionRepository {
	return &folderpermissionRepository{conn: conn}
}

func (folderpermission *folderpermissionRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.FolderPermission)
	return driver.GetById(folderpermission.conn, obj, id)
}

func (folderpermission *folderpermissionRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fldper := obj.(model.FolderPermission)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(folderpermission.conn, &fldper)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	fldper.Id = id
	return id, nil
}

func (folderpermission *folderpermissionRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fldper := obj.(model.FolderPermission)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(folderpermission.conn, &fldper)
	return obj, err
}

func (folderpermission *folderpermissionRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.FolderPermission{Id: id}
	return driver.SoftDeleteById(folderpermission.conn, obj, id)
}

func (folderpermission *folderpermissionRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.FolderPermission{}
	return driver.GetAll(folderpermission.conn, obj, 0, 0)
}
