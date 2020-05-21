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
	"github.com/pucsd2020-pp/rest-api/repository/folder"
)

type Folder struct {
	handler.HTTPHandler
	repo repository.IRepository
}

func NewFolderHandler(conn *sql.DB) *Folder {
	return &Folder{
		repo: folder.NewFolderRepository(conn),
	}
}

func (folder *Folder) GetHTTPHandler() []*handler.HTTPHandler {
	return []*handler.HTTPHandler{
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "folder/{folder_id}", Func: folder.GetByID},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPost, Path: "folder", Func: folder.Create},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodPut, Path: "folder/{folder_id}", Func: folder.Update},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodDelete, Path: "folder/{folder_id}", Func: folder.Delete},
		&handler.HTTPHandler{Authenticated: true, Method: http.MethodGet, Path: "folder", Func: folder.GetAll},
	}
}

func (folder *Folder) GetByID(w http.ResponseWriter, r *http.Request) {
	var fld interface{}
	id, err := strconv.ParseInt(chi.URLParam(r, "folder_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		fld, err = folder.repo.GetByID(r.Context(), id)
		break
	}

	handler.WriteJSONResponse(w, r, fld, http.StatusOK, err)
}

func (folder *Folder) Create(w http.ResponseWriter, r *http.Request) {
	var fld model.Folder
	err := json.NewDecoder(r.Body).Decode(&fld)
	for {
		if nil != err {
			break
		}

		_, err = folder.repo.Create(r.Context(), fld)
		break
	}
	handler.WriteJSONResponse(w, r, fld, http.StatusOK, err)
}

func (folder *Folder) Update(w http.ResponseWriter, r *http.Request) {
	var iFld interface{}
	id, _ := strconv.ParseInt(chi.URLParam(r, "folder_id"), 10, 64)
	fld := model.Folder{}
	err := json.NewDecoder(r.Body).Decode(&fld)
	for {
		if nil != err {
			break
		}
		fld.Id = id
		if nil != err {
			break
		}

		// set logged in user id for tracking update
		//usr.UpdatedBy = 0

		iFld, err = folder.repo.Update(r.Context(), fld)
		if nil != err {
			break
		}
		fld = iFld.(model.Folder)
		break
	}

	handler.WriteJSONResponse(w, r, fld, http.StatusOK, err)
}

func (folder *Folder) Delete(w http.ResponseWriter, r *http.Request) {
	var payload string
	id, err := strconv.ParseInt(chi.URLParam(r, "folder_id"), 10, 64)
	for {
		if nil != err {
			break
		}

		err = folder.repo.Delete(r.Context(), id)
		if nil != err {
			break
		}
		payload = "Folder deleted successfully"
		break
	}

	handler.WriteJSONResponse(w, r, payload, http.StatusOK, err)
}

func (folder *Folder) GetAll(w http.ResponseWriter, r *http.Request) {
	flds, err := folder.repo.GetAll(r.Context())
	handler.WriteJSONResponse(w, r, flds, http.StatusOK, err)
}
