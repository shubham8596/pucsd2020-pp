import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-getuser',
  templateUrl: './getuser.component.html',
  styleUrls: ['./getuser.component.css']
})
export class GetuserComponent implements OnInit, OnDestroy {

  navigationSubscription;
  users = [];
  dataSource=[];
  displayedColumns=['u_id','u_firstname','u_lastname','u_password'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ){}

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: {}) => {
      console.log(data);
      this.getUserdata(data)
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
         let field = {'u_id':array[i][0],'u_firstname':array[i][1],'u_lastname':array[i][2],'u_password':array[i][3]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }

}
