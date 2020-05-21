import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-getdirectory',
  templateUrl: './getdirectory.component.html',
  styleUrls: ['./getdirectory.component.css']
})
export class GetdirectoryComponent implements OnInit {
  navigationSubscription;
  folders = [];
  dataSource=[];
  displayedColumns=['folder_id','folder_name','folder_path'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ){}

  ngOnInit() {
    this.dataService.sendGetFolderRequest().subscribe((data: {}) => {
      console.log(data);
      this.getFolderdata(data)
    });

  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  getFolderdata(data)
  {
      let array=Object.values(data.data);
      let MArray=[];
    
      for(var i=0;i<array.length;i++)
      {
         let field = {'folder_id':array[i][0],'folder_name':array[i][1],'folder_path':array[i][2]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }

}
