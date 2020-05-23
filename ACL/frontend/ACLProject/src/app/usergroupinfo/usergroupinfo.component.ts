import { HttpErrorResponse } from '@angular/common/http';import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-usergroupinfo',
  templateUrl: './usergroupinfo.component.html',
  styleUrls: ['./usergroupinfo.component.css']
})
export class UsergroupinfoComponent implements OnInit {

  navigationSubscription;
  users = [];
  dataSource=[];
  displayedColumns=['u_id','g_id'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit() {
    this.dataService.sendGetUserGroupRequest().subscribe((data: {}) => {
      console.log(data);
      this.getUserdata(data)
    });

  }
  
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  getUserdata(data)
  {
      let array=Object.values(data.data);
      let MArray=[];
    
      for(var i=0;i<array.length;i++)
      {
         let field = {'u_id':array[i][0],'g_id':array[i][1]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }

  getByUserGroupId(id : number) {
    if (id < 0) {
      this.openSnackBar("Please Enter File Id ","👤")
    }
    else {
      this.dataService.getByUserGroupId(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
        this.openSnackBar("File Exist","😊")
         // this.loadGroups();

      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("File Not Exist", "😞")
           // this.loadGroups();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }




}
