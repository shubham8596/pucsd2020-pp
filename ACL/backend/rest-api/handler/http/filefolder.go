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
	"github.com/pucsd2020-pp/rest-api/repository/filefolder"
)

type FileFolder struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewFileFolderHandler(conn *sql.DB) *FileFolder {
	return &FileFolder{
		repo: filefolder.NewFileFolderRepository(conn),
	}
}

func (filefolder *FileFolder) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "filefolder/{file_id}", Func: filefolder.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "filefolder", Func: filefolder.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "filefolder/{file_id}", Func: filefolder.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "filefolder/{file_id}", Func: filefolder.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "filefolder", Func: filefolder.GetAll},
	}
}

func (filefolder *FileFolder) GetByID(w http.ResponseWriter, r *http.Request) {
	var filfld interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		filfld, err = filefolder.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, filfld, http.StatusOK, err)
}

func (filefolder *FileFolder) Create(w http.ResponseWriter, r *http.Request) {
	var filfld model.FileFolder
	err := json.NewDecoder(r.Body).Decode(&filfld)
	for {
		if nil != err {
			break
		}

		_, err = filefolder.repo.Create(r.Context(), filfld)
		break
	}
	handler.WriteJSONResponse(w, r, filfld, http.StatusOK, err)
}

func (filefolder *FileFolder) Update(w http.ResponseWriter, r *http.Request) {
	var iFilFld interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	filfld := model.FileFolder{}
	err := json.NewDecoder(r.Body).Decode(&filfld)
	for {
		if nil != err {
			break
		}
		filfld.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iFilFld, err = filefolder.repo.Update(r.Context(), filfld)
		if nil != err {
			break
		}
		filfld = iFilFld.(model.FileFolder)
		break
	}

	handler.WriteJSONResponse(w, r, filfld, http.StatusOK, err)
}

func (filefolder *FileFolder) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = filefolder.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "File deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (filefolder *FileFolder) GetAll(w http.ResponseWriter, r *http.Request) {
	filflds, err := filefolder.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, filflds, http.StatusOK, err)
}
