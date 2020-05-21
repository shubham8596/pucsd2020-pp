import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updategroup',
  templateUrl: './updategroup.component.html',
  styleUrls: ['./updategroup.component.css']
})
export class UpdategroupComponent implements OnInit {

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
  updategroup: Object  = {} ;
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
    this.updategroup = {
      "g_id":data.g_id,
      "g_name":data.g_name
   }

    this.api.updateGroup(this.updategroup).subscribe(res => {
       console.log(res);
       this.isUpdated=true;
       this.openSnackBar("Group Updated Successfully"," ")
       
    })
  }
}
