import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-deletegroup',
  templateUrl: './deletegroup.component.html',
  styleUrls: ['./deletegroup.component.css']
})
export class DeletegroupComponent implements OnInit {

  navigationSubscription;
  users = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService,
              private _snackBar: MatSnackBar,) {
    
   }
  
  initialiseInvites() {
    this.loadGroups();
  }

  deleteGroup(gID : number) {
    console.log("user id "+gID);
    this.dataService.deleteGroup(gID).subscribe(data => {
   
      this.openSnackBar("Group Deleted Successfully", " ");
     // this.loadUsers();
    })
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }


  loadGroups() {
    this.dataService.sendGetGroupRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }

  getByGroupId(id : number) {
    if (id < 0) {
      this.openSnackBar("Please Enter User Id ","👤")
    }
    else {
      this.dataService.getByGroupId(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
        this.openSnackBar("Group Exist","😊")
         // this.loadGroups();

      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("Group Not Exist", "😞")
           // this.loadGroups();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }



  ngOnInit(): void {
  }

}
