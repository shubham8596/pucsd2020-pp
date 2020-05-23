package http

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"

	"github.com/pucsd2020-pp/rest-api/handler"
	"github.com/pucsd2020-pp/rest-api/model"
	"github.com/pucsd2020-pp/rest-api/repository"
	"github.com/pucsd2020-pp/rest-api/repository/usergroup"
)

type UserGroup struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewUserGroupHandler(conn *sql.DB) *UserGroup {
	return &UserGroup{
		repo: usergroup.NewUserGroupRepository(conn),
	}
}

func (usergroup *UserGroup) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "usergroup/{u_id}", Func: usergroup.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "usergroup", Func: usergroup.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "usergroup/{u_id}", Func: usergroup.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "usergroup/{u_id}", Func: usergroup.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "usergroup", Func: usergroup.GetAll},
	}
}


func (usergroup *UserGroup) GetByID(w http.ResponseWriter, r *http.Request) {
	var usrgrp interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		usrgrp, err = usergroup.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, usrgrp, http.StatusOK, err)
}
/*
func (usergroup *UserGroup) GetByID(w http.ResponseWriter, r *http.Request) {
	gid, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	grp, err := usergroup.repo.GetUsersByGroup(r.Context(), gid)
	handler.WriteJSONResponse(w, r, grp, http.StatusOK, err)
}
*/
func (usergroup *UserGroup) Create(w http.ResponseWriter, r *http.Request) {
	var usrgrp model.UserGroup
	err := json.NewDecoder(r.Body).Decode(&usrgrp)
	for {
		if nil != err {
			break
		}

		_, err = usergroup.repo.Create(r.Context(), usrgrp)
		break
	}
	handler.WriteJSONResponse(w, r, usrgrp, http.StatusOK, err)
}

func (usergroup *UserGroup) Update(w http.ResponseWriter, r *http.Request) {
	var iUsrGrp interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	usrgrp := model.UserGroup{}
	err := json.NewDecoder(r.Body).Decode(&usrgrp)
	for {
		if nil != err {
			break
		}
		usrgrp.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iUsrGrp, err = usergroup.repo.Update(r.Context(), usrgrp)
		if nil != err {
			break
		}
		usrgrp = iUsrGrp.(model.UserGroup)
		break
	}

	handler.WriteJSONResponse(w, r, usrgrp, http.StatusOK, err)
}

func (usergroup *UserGroup) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = usergroup.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "UserGroup deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (usergroup *UserGroup) GetAll(w http.ResponseWriter, r *http.Request) {
	usrgrps, err := usergroup.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, usrgrps, http.StatusOK, err)
}
