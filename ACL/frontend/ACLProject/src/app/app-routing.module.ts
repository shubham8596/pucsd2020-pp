import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateuserComponent} from './createuser/createuser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { HomeComponent } from './home/home.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
const routes: Routes = [{ path: '', component: HomeComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'createuser', component: CreateuserComponent },
                        { path: 'deleteuser', component: DeleteuserComponent },
                        { path: 'userdetails', component: UserdetailsComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
