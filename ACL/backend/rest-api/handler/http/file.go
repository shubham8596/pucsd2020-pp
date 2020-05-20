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
	"github.com/pucsd2020-pp/rest-api/repository/file"
)

type File struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewFileHandler(conn *sql.DB) *File {
	return &File{
		repo: file.NewFileRepository(conn),
	}
}

func (file *File) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "file/{file_id}", Func: file.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "file", Func: file.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "file/{file_id}", Func: file.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "file/{file_id}", Func: file.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "file", Func: file.GetAll},
	}
}

func (file *File) GetByID(w http.ResponseWriter, r *http.Request) {
	var fil interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		fil, err = file.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, fil, http.StatusOK, err)
}

func (file *File) Create(w http.ResponseWriter, r *http.Request) {
	var fil model.File
	err := json.NewDecoder(r.Body).Decode(&fil)
	for {
		if nil != err {
			break
		}

		_, err = file.repo.Create(r.Context(), fil)
		break
	}
	handler.WriteJSONResponse(w, r, fil, http.StatusOK, err)
}

func (file *File) Update(w http.ResponseWriter, r *http.Request) {
	var iFil interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	fil := model.File{}
	err := json.NewDecoder(r.Body).Decode(&fil)
	for {
		if nil != err {
			break
		}
		fil.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iFil, err = file.repo.Update(r.Context(), fil)
		if nil != err {
			break
		}
		fil = iFil.(model.File)
		break
	}

	handler.WriteJSONResponse(w, r, fil, http.StatusOK, err)
}

func (file *File) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "file_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = file.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "File deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (file *File) GetAll(w http.ResponseWriter, r *http.Request) {
	fils, err := file.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, fils, http.StatusOK, err)
}
