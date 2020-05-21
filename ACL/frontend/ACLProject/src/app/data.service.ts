import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {User} from './user';
import {Group} from './group';
import {Directory} from './directory';
import {FilePermission} from './filepermission';
import {FolderPermission} from './folderpermission';
import {File} from './file';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:4200/webapi/v1/user";
  private REST_API_SERVER1= "http://localhost:4200/webapi/v1/usergroup";
  private REST_API_SERVER2= "http://localhost:4200/webapi/v1/group";
  private REST_API_SERVER3= "http://localhost:4200/webapi/v1/folder";
  private REST_API_SERVER4= "http://localhost:4200/webapi/v1/file";
  private REST_API_SERVER5= "http://localhost:4200/webapi/v1/filepermission";
  private REST_API_SERVER6= "http://localhost:4200/webapi/v1/folderpermission";
  public url = 'http://localhost:4200/webapi/v1/user';
  public url1 = 'http://localhost:4200/webapi/v1/group';
  public url2 = 'http://localhost:4200/webapi/v1/folder';
  public url3 = 'http://localhost:4200/webapi/v1/file';
  public url4 = 'http://localhost:4200/webapi/v1/filepermission';
  public url5 = 'http://localhost:4200/webapi/v1/folderpermission';
  
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

  public sendGetFolderRequest() {
    return this.httpClient.get(this.REST_API_SERVER3).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetFileRequest() {
    return this.httpClient.get(this.REST_API_SERVER4).pipe(retry(3), catchError(this.handleError));
  }


  public sendGetFilePermissionRequest() {
    return this.httpClient.get(this.REST_API_SERVER5).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetFolderPermissionRequest() {
    return this.httpClient.get(this.REST_API_SERVER6).pipe(retry(3), catchError(this.handleError));
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

  public getByFolderId(id : number) {
    return this.httpClient.get(this.REST_API_SERVER3 +"/"+ id);
  }
  public getByFileId(id : number) {
    return this.httpClient.get(this.REST_API_SERVER4 +"/"+ id);
  }
  

  // public updateUser(data, id :number ) {
  //   console.log("caledd update")
  //   let httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Cache-Control': 'no-cache'
  //   });
  //   let options = {
  //     headers: httpHeaders
  //   };
  //   return this.httpClient.put(this.REST_API_SERVER + '/' + id, data, options).pipe(catchError(this.handleError));
  // }

  public updateUser(user: User){
    return this.httpClient.put(`${this.url}/${user.u_id}`,user);
  }

  public updateGroup(group: Group){
    return this.httpClient.put(`${this.url1}/${group.g_id}`,group);
  }
  
  public updateDirectory(directory: Directory){
    return this.httpClient.put(`${this.url2}/${directory.folder_id}`,directory);
  }
  
  public updateFile(file: File){
    return this.httpClient.put(`${this.url3}/${file.file_id}`,file);
  }
  

  public updateFilePermission(filepermission: FilePermission){
    return this.httpClient.put(`${this.url4}/${filepermission.u_id}`,filepermission);
  }

  public updateFolderPermission(folderpermission: FolderPermission){
    return this.httpClient.put(`${this.url5}/${folderpermission.u_id}`,folderpermission);
  }

  public deleteProduct(id) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + id).pipe(catchError(this.handleError));
  }

  

  public deleteUser(id : number) {
    console.log("delete User id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER +"/"+ id).pipe(catchError(this.handleError));
  }

  public deleteGroup(id : number) {
    console.log("delete Group id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER2 +"/"+ id).pipe(catchError(this.handleError));
  }

  public deleteFolder(id : number) {
    console.log("delete Folder id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER3 +"/"+ id).pipe(catchError(this.handleError));
  }

  public deleteFile(id : number) {
    console.log("delete Folder id : "+id);
    return this.httpClient.delete(this.REST_API_SERVER4 +"/"+ id).pipe(catchError(this.handleError));
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

  public insertDirectory(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER3, data, options).pipe(catchError(this.handleError));
  }

  public insertFile(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER4, data, options).pipe(catchError(this.handleError));
  }


}
