import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-getfile',
  templateUrl: './getfile.component.html',
  styleUrls: ['./getfile.component.css']
})
export class GetfileComponent implements OnInit {

  navigationSubscription;
  folders = [];
  dataSource=[];
  displayedColumns=['file_id','file_name','file_path'];
  

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ){}

  ngOnInit() {
    this.dataService.sendGetFileRequest().subscribe((data: {}) => {
      console.log(data);
      this.getFiledata(data)
    });

  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  

  getFiledata(data)
  {
      let array=Object.values(data.data);
      let MArray=[];
    
      for(var i=0;i<array.length;i++)
      {
         let field = {'file_id':array[i][0],'file_name':array[i][1],'file_path':array[i][2]};
         MArray.push(field);
      }
      this.dataSource = MArray;
      console.log(this.dataSource[0]);
      console.log(typeof(this.dataSource));
  }
}
