import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addusertogroup',
  templateUrl: './addusertogroup.component.html',
  styleUrls: ['./addusertogroup.component.css']
})
export class AddusertogroupComponent implements OnInit {

  constructor(
    private routers:Router ,private http:HttpClient,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) { }
  registerForm: FormGroup;
  uid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  gid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  ngOnInit() {
    this.createFormValidations();

  }
  openSnackBar(message,action) {
    this._snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top'
    });
  }
  createFormValidations() {
    this.registerForm = this.formBuilder.group({
       uid: this.uid,
       gid: this.gid
    },
    );
  }

  public onSubmit() {
    let userData = {
      "u_id": this.registerForm.value.uid,
      "g_id" : this.registerForm.value.gid,
    };
    if (this.registerForm.invalid) {
      return;
    }
    console.log(userData)
    this.dataService.insertUserInGroup(userData).subscribe(data => {
      this.openSnackBar("User Added in Group Successfully"," ")
    })
    this.registerForm.reset();
  }
}
