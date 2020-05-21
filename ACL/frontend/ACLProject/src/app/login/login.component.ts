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
  dataSource=[];
  loading = false;
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  loginSuccess=false;
  firstLogin = true;
  valid;
  code;
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private httpclient:HttpClient,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) {
    
   }
   u_id = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
   u_password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
  
   ngOnInit() {
   // this.createFormValidations();
    this.dataService.sendGetRequest().subscribe((data:{})=>
    {
      this.getUserdata(data)
    })

  }

  getUserdata(data)
  {
      let array=Object.values(data.data);
     // console.log(array);
      let MArray = [];
      for(var i=0;i<array.length;i++)
      {
         let field = {'u_id':array[i][0],'u_firstname':array[i][1],'u_lastname':array[i][2],'u_password':array[i][3]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource);
  }
  
  createFormValidations() {
    this.loginForm = this.formBuilder.group({

       u_id: this.u_id,
       u_password: this.u_password,
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
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }

  getLogindata(data)
  {
      let array=Object.values(data.data);
      let flag = 0;
      console.log(this.dataSource.length);
      if(this.dataSource.length>0)
      {
        for(var i=0;i<this.dataSource.length;i++)
        {
            // console.log(this.dataSource[i]['userId'],this.dataSource[i]['u_password']);
            if(this.dataSource[i]['u_id'] == array[0] && this.dataSource[i]['u_password'] == this.u_password)
            {
                console.log(this.dataSource[i]['u_id'],this.dataSource[i]['u_password']);
                flag = 1;
                break;
            }
        }
      }
      if(flag == 1)
      {
          console.log("Valid");
          this.loginSuccess = true;
          this.firstLogin = false;
          this.router.navigate(['userdetails'])
          this.openSnackBar("User Login Successfully","😊")
      }
      else
      {
        console.log("Invalid");
       // window.alert("Enter Valid Credential");
        this.openSnackBar("Please Enter Valid User id and Password ","👤")
      }
  }

  login()
  {
      
      let post = '{"u_id":"'+this.u_id+'","u_password":"'+this.u_password+'"}'
      this.dataService.login(post).subscribe((data: {}) => {
      //  console.log(data);
        this.getLogindata(data)
      });

  }

}
