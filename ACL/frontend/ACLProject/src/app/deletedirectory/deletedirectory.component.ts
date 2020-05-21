import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deletedirectory',
  templateUrl: './deletedirectory.component.html',
  styleUrls: ['./deletedirectory.component.css']
})
export class DeletedirectoryComponent implements OnInit {

  navigationSubscription;
  users = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService,
              private _snackBar: MatSnackBar,) {
    
   }
   ngOnInit(){

   }
  
  initialiseInvites() {
    this.loadFolders();
  }

  deleteFolder(fID : number) {
    console.log("folder id "+fID);
    this.dataService.deleteFolder(fID).subscribe(data => {
   
      this.openSnackBar("Directory Deleted Successfully", " ");
     // this.loadUsers();
    })
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }


  loadFolders() {
    this.dataService.sendGetFolderRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }

  getByFolderId(id : number) {
    if (id < 0) {
      this.openSnackBar("Please Enter Directory Id ","👤")
    }
    else {
      this.dataService.getByFolderId(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
        this.openSnackBar("Directory Exist","😊")
         // this.loadGroups();

      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("Directory Not Exist", "😞")
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
