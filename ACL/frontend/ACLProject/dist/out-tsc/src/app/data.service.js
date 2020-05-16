import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let DataService = class DataService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.REST_API_SERVER = "http://localhost:4200/webapi/v1/user";
    }
    handleError(error) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
    insertUser(data) {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders
        };
        return this.httpClient.post(this.REST_API_SERVER, data, options).pipe(catchError(this.handleError));
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map