import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CareerObjectiveComponent } from './career-objective/career-objective.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechnicalSkillandToolsUsedComponent } from './technical-skilland-tools-used/technical-skilland-tools-used.component';
import { StrengthComponent } from './strength/strength.component';
import { InterestComponent } from './interest/interest.component';
const routes: Routes = [{path : 'profile' , component : ProfileComponent},
                        {path : 'career-objective', component : CareerObjectiveComponent},
                        {path : 'personal-details', component : PersonalDetailsComponent},
                        {path : 'academic-details', component : AcademicDetailsComponent},
                        {path : 'projects', component : ProjectsComponent},
                        {path : 'technical-skilland-tools-used' , component : TechnicalSkillandToolsUsedComponent},
                        {path : 'strength' , component : StrengthComponent},
                        {path : 'interest' , component : InterestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
