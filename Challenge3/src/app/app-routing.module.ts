import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import {RegisterUserComponent} from './register-user/register-user.component'


const routes: Routes = [ { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent ,
  // canActivate: [AuthenticationGuard],
  runGuardsAndResolvers: 'always',},
  { path: 'register', component: RegisterUserComponent },
  { path: 'search', component: SearchComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'update', component: UpdateComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
