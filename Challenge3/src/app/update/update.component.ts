import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent  } from '../updateuser/updateuser.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  

  constructor(private _snackBar: MatSnackBar,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router) { }

    navigationSubscription;
  users = [];

    destroy$: Subject<boolean> = new Subject<boolean>();

  openDialog(user) {

    const dialogRef = this.dialog.open(UpdateuserComponent, {
      data: user
    });


    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      console.log(`Dialog result: ${result}`);
    });
  }

  loadUsers() {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }

  getById(id) {
    if (id.trim() == "") {
      this.openSnackBar("Please Enter User id ","👤")
    }
    else {
      this.dataService.getById(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
      
          this.openSnackBar("User Exist","😊")
         // this.loadUsers();
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("User Not Exist", "😞")
           // this.loadUsers();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
  }

}
