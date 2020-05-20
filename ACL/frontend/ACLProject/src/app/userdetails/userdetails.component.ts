import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  navigationSubscription;
  users = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    
   }

  
  initialiseInvites() {
    this.loadUsers();
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 10000,
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
      this.openSnackBar("Please Enter User id ","👤")
    }
    else {
      this.dataService.getById(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
      
          this.openSnackBar("User Record Exist","😊")
         // this.loadUsers();
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            this.openSnackBar("User Record Not Exist", "😞")
           // this.loadUsers();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }

  ngOnInit(): void {
  }  goToPage(pageName: string): void {
    localStorage.clear();
    confirm('logged out success')
    this.router.navigate([`${pageName}`]);

  }

}

