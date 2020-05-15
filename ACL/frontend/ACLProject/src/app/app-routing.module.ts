import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateuserComponent} from './createuser/createuser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
                        { path: 'createuser', component: CreateuserComponent },
                        { path: 'userdetails', component: UserdetailsComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
