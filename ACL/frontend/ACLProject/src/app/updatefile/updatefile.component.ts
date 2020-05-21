import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-updatefile',
  templateUrl: './updatefile.component.html',
  styleUrls: ['./updatefile.component.css']
})
export class UpdatefileComponent implements OnInit {

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
  updatefile: Object  = {} ;
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
    this.updatefile = {
      "file_id":data.file_id,
      "file_name":data.file_name,
      "file_path":data.file_path
   }

    this.api.updateFile(this.updatefile).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("File Updated Successfully"," ")
    })
  }



}
