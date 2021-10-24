import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsListService } from './students-list.service';

 
const appRoutes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'studentDetails/:id/:name', component: StudentDetailsComponent },
  { path: 'studentsList', component: StudentsListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(), 
    BrowserAnimationsModule 

  ],
  providers: [StudentsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
