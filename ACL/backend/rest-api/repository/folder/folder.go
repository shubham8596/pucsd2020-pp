package folder

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type folderRepository struct {
	conn *sql.DB
}

func NewFolderRepository(conn *sql.DB) *folderRepository {
	return &folderRepository{conn: conn}
}

func (folder *folderRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.Folder)
	return driver.GetByFolderId(folder.conn, obj, id)
}

func (folder *folderRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fld := obj.(model.Folder)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(folder.conn, &fld)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	fld.Id = id
	return id, nil
}

func (folder *folderRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	fld := obj.(model.Folder)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(folder.conn, &fld)
	return obj, err
}

func (folder *folderRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.Folder{Id: id}
	return driver.SoftDeleteByFolderId(folder.conn, obj, id)
}

func (folder *folderRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.Folder{}
	return driver.GetAll(folder.conn, obj, 0, 0)
}
