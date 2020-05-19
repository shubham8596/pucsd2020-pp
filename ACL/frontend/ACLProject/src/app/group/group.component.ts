import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  
  constructor(
    private routers:Router ,private http:HttpClient,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) { }


  registerForm: FormGroup;
  gid = new FormControl('',  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  gname = new FormControl('', [Validators.required, Validators.maxLength(100)]);
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

       gid: this.gid,
       gname: this.gname,
       
    },
    );
  }

  public onSubmit() {
    let userData = {
      "g_id": this.registerForm.value.gid,
      "g_name" : this.registerForm.value.gname,
    };
    if (this.registerForm.invalid) {

      return;
    }
    console.log(userData)
    this.dataService.insertGroup(userData).subscribe(data => {
      this.openSnackBar("New Group Added Successfully"," ")
    })
    this.registerForm.reset();
  }


}
