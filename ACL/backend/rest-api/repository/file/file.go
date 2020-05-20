package file

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type fileRepository struct {
	conn *sql.DB
}

func NewFileRepository(conn *sql.DB) *fileRepository {
	return &fileRepository{conn: conn}
}

func (file *fileRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.File)
	return driver.GetByFileId(file.conn, obj, id)
}

func (file *fileRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fil := obj.(model.File)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(file.conn, &fil)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	fil.Id = id
	return id, nil
}

func (file *fileRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fil := obj.(model.File)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(file.conn, &fil)
	return obj, err
}

func (file *fileRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.File{Id: id}
	return driver.SoftDeleteByFileId(file.conn, obj, id)
}

func (file *fileRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.File{}
	return driver.GetAll(file.conn, obj, 0, 0)
}
