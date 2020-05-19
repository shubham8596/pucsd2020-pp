import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
}
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  updateForm: FormGroup;
  id = new FormControl(this.data.id,[Validators.required, Validators.pattern(new RegExp("[0-9 ]"))]);
  firstname = new FormControl(this.data.first_name, [Validators.required, Validators.maxLength(100)]);
  lastname = new FormControl(this.data.last_name, [Validators.required, Validators.maxLength(100)]);
  password = new FormControl(this.data.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);



  ngOnInit() {

    this.createFormValidations();
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  createFormValidations() {
    this.updateForm = this.formBuilder.group({
      id:this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password
      
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onUpdateClick(id : number) {
    let userData = {
      "u_firstname": this.updateForm.value.firstname,
      "u_lastname": this.updateForm.value.lastname,
      "u_password": this.updateForm.value.password
    };
    this.dataService.updateUser(userData,this.data.id).subscribe(data => {
      this.openSnackBar("Successfully Updated", " 🎉")
      this.dialogRef.close();
    })
  }
}
