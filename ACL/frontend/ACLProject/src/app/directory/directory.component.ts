
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  constructor(
    private routers:Router ,private http:HttpClient,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) { }
  registerForm: FormGroup;
  fid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  fname = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  fpath = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  
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

       fid: this.fid,
       fname: this.fname,
       fpath: this.fpath,
      //  createdate:this.createdate
    },
    );
  }

  public onSubmit() {
    let userData = {
      "folder_id": this.registerForm.value.fid,
      "folder_name" : this.registerForm.value.fname,
      "folder_path" : this.registerForm.value.fpath,
    };
    if (this.registerForm.invalid) {

      return;
    }
    console.log(userData)
    this.dataService.insertDirectory(userData).subscribe(data => {
      this.openSnackBar("New Directory Added Successfully"," ")
    })
    this.registerForm.reset();
  }


}
