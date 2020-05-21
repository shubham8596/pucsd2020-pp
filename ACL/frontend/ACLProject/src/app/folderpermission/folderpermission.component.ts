import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-folderpermission',
  templateUrl: './folderpermission.component.html',
  styleUrls: ['./folderpermission.component.css']
})
export class FolderpermissionComponent implements OnInit {

  navigationSubscription;
  folders = [];
  dataSource=[];
  displayedColumns=['u_id','folder_id','p_type'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ){}

  ngOnInit() {
    this.dataService.sendGetFolderPermissionRequest().subscribe((data: {}) => {
      console.log(data);
      this.getFolderPermissiondata(data)
    });

  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  getFolderPermissiondata(data)
  {
      let array=Object.values(data.data);
      let MArray=[];
    
      for(var i=0;i<array.length;i++)
      {
         let field = {'u_id':array[i][0],'folder_id':array[i][1],'p_type':array[i][2]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }

}
