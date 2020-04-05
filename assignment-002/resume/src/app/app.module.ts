import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { CareerObjectiveComponent } from './career-objective/career-objective.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsComponent } from './projects/projects.component';
import { TechnicalSkillandToolsUsedComponent } from './technical-skilland-tools-used/technical-skilland-tools-used.component';
import { StrengthComponent } from './strength/strength.component';
import { InterestComponent } from './interest/interest.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CareerObjectiveComponent,
    PersonalDetailsComponent,
    AcademicDetailsComponent,
    ProjectsComponent,
    TechnicalSkillandToolsUsedComponent,
    StrengthComponent,
    InterestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
