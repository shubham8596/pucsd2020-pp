import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
//import { HomeComponent } from './home/home.component';
import { MatMenuModule} from '@angular/material/menu';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { GroupComponent } from './group/group.component';
import { DirectoryComponent } from './directory/directory.component';
import { GetuserComponent } from './getuser/getuser.component';
import { GetgroupComponent } from './getgroup/getgroup.component';
import { DeletegroupComponent } from './deletegroup/deletegroup.component';
import { AddusertogroupComponent } from './addusertogroup/addusertogroup.component';
import { UsergroupinfoComponent } from './usergroupinfo/usergroupinfo.component';
import { FileComponent } from './file/file.component';
import { DeletedirectoryComponent } from './deletedirectory/deletedirectory.component';
import { GetdirectoryComponent } from './getdirectory/getdirectory.component';
import { PermissionComponent } from './permission/permission.component';
import { FilepermissionComponent } from './filepermission/filepermission.component';
import { FolderpermissionComponent } from './folderpermission/folderpermission.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UpdategroupComponent } from './updategroup/updategroup.component';
import { UpdatedirectoryComponent } from './updatedirectory/updatedirectory.component';
import { UpdatefilepermissionComponent } from './updatefilepermission/updatefilepermission.component';
import { UpdatefolderpermissionComponent } from './updatefolderpermission/updatefolderpermission.component';
import { DeletefileComponent } from './deletefile/deletefile.component';
import { GetfileComponent } from './getfile/getfile.component';
import { UpdatefileComponent } from './updatefile/updatefile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateuserComponent,
    UserdetailsComponent,
  //  HomeComponent,
    DeleteuserComponent,
    GroupComponent,
    DirectoryComponent,
    GetuserComponent,
    GetgroupComponent,
    DeletegroupComponent,
    AddusertogroupComponent,
    UsergroupinfoComponent,
    FileComponent,
    DeletedirectoryComponent,
    GetdirectoryComponent,
    PermissionComponent,
    FilepermissionComponent,
    FolderpermissionComponent,
    UpdateuserComponent,
    UpdategroupComponent,
    UpdatedirectoryComponent,
    UpdatefilepermissionComponent,
    UpdatefolderpermissionComponent,
    DeletefileComponent,
    GetfileComponent,
    UpdatefileComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatCheckboxModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
