import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from '../updateuser/updateuser.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  navigationSubscription;
  users = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      // to reload current component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }
  openDialog(user) {

    const dialogRef = this.dialog.open(UpdateuserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      console.log(`Dialog result: ${result}`);
    });
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
  loadUsers() {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
    })
  }
  getById(id) {
    if (id.trim() == "") {
      console.log("called")
      this.loadUsers();
    }
    else {
      this.dataService.getById(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("No User Found", " 😓")
            this.loadUsers();
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }



  deleteProduct(uID) {
    this.dataService.deleteProduct(uID).subscribe(data => {
      this.openSnackBar("User Deleted", "👍🏻");
      this.loadUsers();
    })
  }
  getNavigation(link) {
    this.router.navigate([link]);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
