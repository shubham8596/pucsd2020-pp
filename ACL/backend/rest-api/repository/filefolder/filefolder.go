package filefolder

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type filefolderRepository struct {
	conn *sql.DB
}

func NewFileFolderRepository(conn *sql.DB) *filefolderRepository {
	return &filefolderRepository{conn: conn}
}

func (filefolder *filefolderRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.FileFolder)
	return driver.GetByFileId(filefolder.conn, obj, id)
}

func (filefolder *filefolderRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	filfld := obj.(model.FileFolder)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(filefolder.conn, &filfld)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	filfld.Id = id
	return id, nil
}

func (filefolder *filefolderRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	filfld := obj.(model.FileFolder)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(filefolder.conn, &filfld)
	return obj, err
}

func (filefolder *filefolderRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.FileFolder{Id: id}
	return driver.SoftDeleteByFileId(filefolder.conn, obj, id)
}

func (filefolder *filefolderRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.FileFolder{}
	return driver.GetAll(filefolder.conn, obj, 0, 0)
}
