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
  ){}

  ngOnInit() {
    this.dataService.sendGetUserGroupRequest().subscribe((data: {}) => {
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
         let field = {'u_id':array[i][0],'g_id':array[i][1]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }


}
