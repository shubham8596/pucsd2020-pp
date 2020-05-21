package filepermission

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type filepermissionRepository struct {
	conn *sql.DB
}

func NewFilePermissionRepository(conn *sql.DB) *filepermissionRepository {
	return &filepermissionRepository{conn: conn}
}

func (filepermission *filepermissionRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.FilePermission)
	return driver.GetById(filepermission.conn, obj, id)
}

func (filepermission *filepermissionRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	filper := obj.(model.FilePermission)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(filepermission.conn, &filper)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	filper.Id = id
	return id, nil
}

func (filepermission *filepermissionRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	filper := obj.(model.FilePermission)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(filepermission.conn, &filper)
	return obj, err
}

func (filepermission *filepermissionRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.FilePermission{Id: id}
	return driver.SoftDeleteById(filepermission.conn, obj, id)
}

func (filepermission *filepermissionRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.FilePermission{}
	return driver.GetAll(filepermission.conn, obj, 0, 0)
}
