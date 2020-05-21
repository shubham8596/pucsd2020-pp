import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-updatefilepermission',
  templateUrl: './updatefilepermission.component.html',
  styleUrls: ['./updatefilepermission.component.css']
})
export class UpdatefilepermissionComponent implements OnInit {

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
  updatefilepermission: Object  = {} ;
  isUpdated: Boolean = false;
 
  ngOnInit(): void {
  }
  
  openSnackBar(message,action) {
    this._snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  put = function(data){
    this.updatefilepermission = {
      "u_id":data.u_id,
      "file_id":data.file_id,
      "p_type":data.p_type
   }

    this.api.updateFilePermission(this.updatefilepermission).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("File Permission Updated Successfully"," ")
     //  this.router.navigate(['filepermission'])
          
    })
  }


}
