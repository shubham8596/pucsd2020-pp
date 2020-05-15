import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) { }
  registerForm: FormGroup;
  uid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  firstname = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  lastname = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
  // createdate = new FormControl('', [Validators.required, Validators.maxLength(100)]);
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
       firstname: this.firstname,
       lastname: this.lastname,
       password: this.password,
      //  createdate:this.createdate
    },
    );
  }

  onSubmit() {
    let userData = {
      "u_id": this.registerForm.value.uid,
      "u_firstname" : this.registerForm.value.firstname,
      "u_lastname" : this.registerForm.value.lastname,
      "u_password": this.registerForm.value.password,
      // "u_creation_date" : this.registerForm.value.createdate
    };
    if (this.registerForm.invalid) {

      return;
    }
    console.log(userData)
    this.dataService.insertUser(userData).subscribe(data => {
      this.openSnackBar("New Record Added Successfully"," ")
    })
    this.registerForm.reset();
  }

}
