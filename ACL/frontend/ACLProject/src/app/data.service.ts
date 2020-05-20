import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:4200/webapi/v1/user";
  private REST_API_SERVER1= "http://localhost:4200/webapi/v1/usergroup";
  private REST_API_SERVER2= "http://localhost:4200/webapi/v1/group";
  
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  loginUser(body) {
    return this.httpClient.post('/webapi/v1/isvaliduser', body);
  }

  login(poststring)
    {
        return this.httpClient.post(this.REST_API_SERVER,poststring);
    }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }
  public sendGetGroupRequest() {
    return this.httpClient.get(this.REST_API_SERVER2).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetUserGroupRequest() {
    return this.httpClient.get(this.REST_API_SERVER1).pipe(retry(3), catchError(this.handleError));
  }

  public getById(id : number) {
    return this.httpClient.get(this.REST_API_SERVER +"/"+ id);
  }

  public getByGroupId(id : number) {
    return this.httpClient.get(this.REST_API_SERVER2 +"/"+ id);
  }

  public getByUserGroupId(id : number) {
    return this.httpClient.get(this.REST_API_SERVER1 +"/"+ id);
  }
  
  public updateUser(data, id :number ) {
    console.log("caledd update")
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.put(this.REST_API_SERVER + '/' + id, data, options).pipe(catchError(this.handleError));
  }

  
  public deleteProduct(id) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + id).pipe(catchError(this.handleError));
  }

  

  public deleteUser(id : number) {
    console.log("delete User id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER +"/"+ id).pipe(catchError(this.handleError));
  }

  public deleteGroup(id : number) {
    console.log("delete User id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER2 +"/"+ id).pipe(catchError(this.handleError));
  }


  public insertUser(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER, data, options).pipe(catchError(this.handleError));
  }

  public insertUserInGroup(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER1, data, options).pipe(catchError(this.handleError));
  }


  public insertGroup(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER2, data, options).pipe(catchError(this.handleError));
  }

}
