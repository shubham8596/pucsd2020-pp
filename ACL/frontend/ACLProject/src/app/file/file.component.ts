
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

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
      "file_id": this.registerForm.value.fid,
      "file_name" : this.registerForm.value.fname,
      "file_path" : this.registerForm.value.fpath,
    };
    if (this.registerForm.invalid) {

      return;
    }
    console.log(userData)
    this.dataService.insertFile(userData).subscribe(data => {
      this.openSnackBar("New File Added Successfully"," ")
    })
    this.registerForm.reset();
  }

}
