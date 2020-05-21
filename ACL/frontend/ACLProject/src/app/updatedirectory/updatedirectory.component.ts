import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-updatedirectory',
  templateUrl: './updatedirectory.component.html',
  styleUrls: ['./updatedirectory.component.css']
})
export class UpdatedirectoryComponent implements OnInit {

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
  updatedirectory: Object  = {} ;
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
    this.updatedirectory = {
      "folder_id":data.folder_id,
      "folder_name":data.folder_name,
      "folder_path":data.folder_path
   }

    this.api.updateDirectory(this.updatedirectory).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("Directory Updated Successfully"," ")
       this.router.navigate(['getdirectory'])
          
    })
  }



}
