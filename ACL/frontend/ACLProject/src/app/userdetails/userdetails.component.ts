// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { DataService } from '../data.service';
// import { takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
// import {FlatTreeControl} from '@angular/cdk/tree';
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Folder1',
//     children: [
//       {name: 'f1.txt'},
//       {name: 'f2.txt'},
//       {name: 'f3.txt'},
//     ]
//   }, {
//     name: 'Folder2',
//     children: [
//       {
//         name: 'Folder2.1',
//         children: [
//           {name: 'f1.txt'},
//           {name: 'f2.txt'},
//         ]
//       }, {
//         name: 'Folder2.2',
//         children: [
//           {name: 'f3.txt'},
//           {name: 'f4.txt'},
//         ]
//       },
//     ]
//   },
// ];

// /** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }

// @Component({
//   selector: 'userdetails',
//   templateUrl: './userdetails.component.html',
//   styleUrls: ['./userdetails.component.css']
// })
// export class UserdetailsComponent implements OnInit {

//    private _transformer = (node: FoodNode, level: number) => {
//     return {
//       expandable: !!node.children && node.children.length > 0,
//       name: node.name,
//       level: level,
//     };
//   }

//   treeControl = new FlatTreeControl<ExampleFlatNode>(
//       node => node.level, node => node.expandable);

//   treeFlattener = new MatTreeFlattener(
//       this._transformer, node => node.level, node => node.expandable, node => node.children);

//   dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  

//   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
//   constructor() {
//   this.dataSource.data = TREE_DATA; }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser'
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
export interface DialogData {
  id: number;
  gid: number;
}

@Component({
  selector: 'userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {


  navigationSubscription;
  users = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}
   registerForm: FormGroup;
   uid = new FormControl(this.data.id,  [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
   gid = new FormControl(this.data.gid, [Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  
   ngOnInit() {
    this.createFormValidations();

  }
  
  createFormValidations() {
    this.registerForm = this.formBuilder.group({

       uid: this.uid,
       gid: this.gid,
      //  createdate:this.createdate
    },
    );
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
    this.dataService.sendGetUserGroupRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.users = data;
      console.log(data)
    })
  }

  onUpdateClick() {
    let userData = {
      "u_id": this.registerForm.value.id,
      "g_id": this.registerForm.value.g_id
    };
    this.dataService.getByUserGroupId(this.data.id).subscribe(data => {
      this.openSnackBar("Successfully Updated", " 🎉")
      this.dialogRef.close();
    })
  }

  getByUserGroupId(id) {
    if (id == "") {
      this.openSnackBar("Please Enter User id and Password ","👤")
    }
    else {
      this.dataService.getByUserGroupId(id).subscribe((data: any[]) => {
        console.log(Object.keys(data).length)
        var stringData = '[' + JSON.stringify(data) + ']'
        var parseData = JSON.parse(stringData)
        this.users = parseData;
      
          this.openSnackBar("Login Successfully","😊")
          this.loadUsers();
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

  
}