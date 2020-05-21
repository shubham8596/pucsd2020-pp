import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  id;
  dataSource;
  searchForm: any;
  updateForm: any;
  formBuilder: any;
  constructor(
    private route: ActivatedRoute,
    private api: DataService,
    private _snackBar: MatSnackBar,
   
  ) { }
  updateuser: Object  = {} ;
  isUpdated: Boolean = false;
  Confirmation: String = "User details has been Updated.";

  ngOnInit(): void {
  }
  
  openSnackBar(message,action) {
    this._snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  put = function(data){
    this.updateuser = {
      "u_id":data.u_id,
      "u_firstname":data.u_firstname,
      "u_lastname":data.u_lastname,
      "u_password":data.u_password
  }

    this.api.updateUser(this.updateuser).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("Record Updated Successfully"," ")
       
    })
  }



}
