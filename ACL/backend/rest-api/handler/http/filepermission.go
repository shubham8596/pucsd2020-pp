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
	"github.com/pucsd2020-pp/rest-api/repository/filepermission"
)

type FilePermission struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewFilePermissionHandler(conn *sql.DB) *FilePermission {
	return &FilePermission{
		repo: filepermission.NewFilePermissionRepository(conn),
	}
}

func (filepermission *FilePermission) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "filepermission/{u_id}", Func: filepermission.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "filepermission", Func: filepermission.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "filepermission/{u_id}", Func: filepermission.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "filepermission/{u_id}", Func: filepermission.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "filepermission", Func: filepermission.GetAll},
	}
}

func (filepermission *FilePermission) GetByID(w http.ResponseWriter, r *http.Request) {
	var filper interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		filper, err = filepermission.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, filper, http.StatusOK, err)
}

func (filepermission *FilePermission) Create(w http.ResponseWriter, r *http.Request) {
	var filper model.FilePermission
	err := json.NewDecoder(r.Body).Decode(&filper)
	for {
		if nil != err {
			break
		}

		_, err = filepermission.repo.Create(r.Context(), filper)
		break
	}
	handler.WriteJSONResponse(w, r, filper, http.StatusOK, err)
}

func (filepermission *FilePermission) Update(w http.ResponseWriter, r *http.Request) {
	var iFilPer interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	filper := model.FilePermission{}
	err := json.NewDecoder(r.Body).Decode(&filper)
	for {
		if nil != err {
			break
		}
		filper.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iFilPer, err = filepermission.repo.Update(r.Context(), filper)
		if nil != err {
			break
		}
		filper = iFilPer.(model.FilePermission)
		break
	}

	handler.WriteJSONResponse(w, r, filper, http.StatusOK, err)
}

func (filepermission *FilePermission) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "u_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = filepermission.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "File Permission deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (filepermission *FilePermission) GetAll(w http.ResponseWriter, r *http.Request) {
	filpers, err := filepermission.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, filpers, http.StatusOK, err)
}
