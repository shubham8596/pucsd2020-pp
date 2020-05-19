import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-getgroup',
  templateUrl: './getgroup.component.html',
  styleUrls: ['./getgroup.component.css']
})
export class GetgroupComponent implements OnInit {

  navigationSubscription;
  users = [];
  dataSource=[];
  displayedColumns=['g_id','g_name'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ){}

  ngOnInit() {
    this.dataService.sendGetGroupRequest().subscribe((data: {}) => {
      console.log(data);
      this.getGroupdata(data)
    });

  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  getGroupdata(data)
  {
      let array=Object.values(data.data);
      let MArray=[];
    
      for(var i=0;i<array.length;i++)
      {
         let field = {'g_id':array[i][0],'g_name':array[i][1]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }


}
