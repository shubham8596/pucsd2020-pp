import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateuserComponent} from './createuser/createuser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
// import { HomeComponent } from './home/home.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { GroupComponent } from './group/group.component';
import { DirectoryComponent } from './directory/directory.component';
import { GetuserComponent } from './getuser/getuser.component';
import { DeletegroupComponent } from './deletegroup/deletegroup.component';
import { GetgroupComponent } from './getgroup/getgroup.component';
import { AddusertogroupComponent } from './addusertogroup/addusertogroup.component';
import { UsergroupinfoComponent } from './usergroupinfo/usergroupinfo.component'; 
import { FileComponent } from './file/file.component'; 
import { GetdirectoryComponent } from './getdirectory/getdirectory.component';
import { DeletedirectoryComponent } from './deletedirectory/deletedirectory.component';

const routes: Routes = [
                        // { path: '', redirectTo: 'home', pathMatch: 'full' },
                        // { path: 'home', component: HomeComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'createuser', component: CreateuserComponent },
                        { path: 'deleteuser', component: DeleteuserComponent },
                        { path: 'userdetails', component: UserdetailsComponent },
                        { path: 'group', component: GroupComponent },
                        { path: 'directory', component: DirectoryComponent },
                        { path: 'getuser', component: GetuserComponent },
                        { path: 'deletegroup', component: DeletegroupComponent },
                        { path: 'getgroup', component: GetgroupComponent },
                        { path: 'addusertogroup', component: AddusertogroupComponent },
                        { path: 'usergroupinfo', component: UsergroupinfoComponent},
                        { path: 'file', component: FileComponent},
                        { path: 'deletedirectory', component: DeletedirectoryComponent},
                        { path: 'getdirectory', component: GetdirectoryComponent},
                        
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
