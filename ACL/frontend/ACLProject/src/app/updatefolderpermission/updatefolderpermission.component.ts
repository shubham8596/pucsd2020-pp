import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-updatefolderpermission',
  templateUrl: './updatefolderpermission.component.html',
  styleUrls: ['./updatefolderpermission.component.css']
})
export class UpdatefolderpermissionComponent implements OnInit {

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
  updatefolderpermission: Object  = {} ;
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
    this.updatefolderpermission = {
      "u_id":data.u_id,
      "folder_id":data.folder_id,
      "p_type":data.p_type
   }

    this.api.updateFolderPermission(this.updatefolderpermission).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("Folder Permission Updated Successfully"," ")
     //  this.router.navigate(['filepermission'])
          
    })
  }


}
