import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  navigationSubscription;
  users = [];
  loading = false;
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  valid;
  code;
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private httpclient:HttpClient,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router,
              private api: DataService) {
    
   }
   uid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
   password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
  
   ngOnInit() {
    this.createFormValidations();

  }
  
  createFormValidations() {
    this.loginForm = this.formBuilder.group({

       uid: this.uid,
       password: this.password,
      //  createdate:this.createdate
    },
    );
  }


  initialiseInvites() {
    this.loadUsers();
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  loadUsers() {
    this.dataService.sendGetUserGroupRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }

  

  getByUserGroupId(id) {
    if (id.trim() == "") {
      this.openSnackBar("Please Enter User id and Password ","👤")
    }
    else {
      this.dataService.getByUserGroupId(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
      
          this.openSnackBar("Login Successfully","😊")

         // this.loadUsers();
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("User Record Not Exist", "😞")
           // this.loadUsers();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }

}