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
	"github.com/pucsd2020-pp/rest-api/repository/folderpermission"
)

type FolderPermission struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewFolderPermissionHandler(conn *sql.DB) *FolderPermission {
	return &FolderPermission{
		repo: folderpermission.NewFolderPermissionRepository(conn),
	}
}

func (folderpermission *FolderPermission) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "folderpermission/{u_id}", Func: folderpermission.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "folderpermission", Func: folderpermission.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "folderpermission/{u_id}", Func: folderpermission.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "folderpermission/{u_id}", Func: folderpermission.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "folderpermission", Func: folderpermission.GetAll},
	}
}

func (folderpermission *FolderPermission) GetByID(w http.ResponseWriter, r *http.Request) {
	var fldper interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		fldper, err = folderpermission.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, fldper, http.StatusOK, err)
}

func (folderpermission *FolderPermission) Create(w http.ResponseWriter, r *http.Request) {
	var fldper model.FolderPermission
	err := json.NewDecoder(r.Body).Decode(&fldper)
	for {
		if nil != err {
			break
		}

		_, err = folderpermission.repo.Create(r.Context(), fldper)
		break
	}
	handler.WriteJSONResponse(w, r, fldper, http.StatusOK, err)
}

func (folderpermission *FolderPermission) Update(w http.ResponseWriter, r *http.Request) {
	var iFldPer interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	fldper := model.FolderPermission{}
	err := json.NewDecoder(r.Body).Decode(&fldper)
	for {
		if nil != err {
			break
		}
		fldper.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iFldPer, err = folderpermission.repo.Update(r.Context(), fldper)
		if nil != err {
			break
		}
		fldper = iFldPer.(model.FolderPermission)
		break
	}

	handler.WriteJSONResponse(w, r, fldper, http.StatusOK, err)
}

func (folderpermission *FolderPermission) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = folderpermission.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "Folder Permission deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (folderpermission *FolderPermission) GetAll(w http.ResponseWriter, r *http.Request) {
	fldpers, err := folderpermission.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, fldpers, http.StatusOK, err)
}
