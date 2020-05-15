package group

import (
	"context"
	"database/sql"

	"github.com/pucsd2020-pp/rest-api/driver"
	"github.com/pucsd2020-pp/rest-api/model"
)

type groupRepository struct {
	conn *sql.DB
}

func NewGroupRepository(conn *sql.DB) *groupRepository {
	return &groupRepository{conn: conn}
}

func (group *groupRepository) GetByID(cntx context.Context, id int64) (interface{}, error) {
	obj := new(model.Group)
	return driver.GetByGroupId(group.conn, obj, id)
}

func (group *groupRepository) Create(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	grp := obj.(model.Group)
	// result, err := driver.Create(user.conn, usr)
	result, err := driver.Create(group.conn, &grp)
	if nil != err {
		return 0, err
	}

	id, _ := result.LastInsertId()
	grp.Id = id
	return id, nil
}

func (group *groupRepository) Update(cntx context.Context, obj interface{}) (interface{}, error) {
	// usr := obj.(*model.User)
	grp := obj.(model.Group)
	// err := driver.UpdateById(user.conn, usr)
	err := driver.UpdateById(group.conn, &grp)
	return obj, err
}

func (group *groupRepository) Delete(cntx context.Context, id int64) error {
	obj := &model.Group{Id: id}
	return driver.SoftDeleteByGroupId(group.conn, obj, id)
}

func (group *groupRepository) GetAll(cntx context.Context) ([]interface{}, error) {
	obj := &model.Group{}
	return driver.GetAll(group.conn, obj, 0, 0)
}
