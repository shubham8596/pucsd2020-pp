
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ACLProject';

  constructor(public router: Router,
    private _snackBar: MatSnackBar,) { }
  ngOnInit(): void {
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
  goToPage(pageName: string): void {
    localStorage.clear();
    this.openSnackBar("Logout Successfully","😊")
    this.router.navigate([`${pageName}`]);

  }
}
