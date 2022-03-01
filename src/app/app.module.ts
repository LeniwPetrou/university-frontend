import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { UpdateUserDialogComponent } from "./dialog/update-user-dialog/update-user-dialog.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { UserComponent } from "./user/user.component";
import { UsersListService } from "./services/users-list.service";
import { UsersListComponent } from "./users-list/users-list.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { DeleteUserDialogComponent } from "./dialog/delete-user-dialog/delete-user-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignUpDialogComponent } from './dialog/sign-up-dialog/sign-up-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarCoursesComponent } from './calendar-courses/calendar-courses.component';
import { DemoUtilsModule } from "./demo-utils/demo-utils-module";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RolesComponent } from "./roles/roles.component";
import { MatSelectModule } from "@angular/material/select";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { CoursesComponent } from './courses/courses.component';
import { AddCourseDialogComponent } from './dialog/add-course-dialog/add-course-dialog.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
import { CourseDialogComponent } from './dialog/course-dialog/course-dialog.component';
import { AddRoleDialogComponent } from './dialog/add-role-dialog/add-role-dialog.component';
import { DeleteRoleDialogComponent } from './dialog/delete-role-dialog/delete-role-dialog.component';

const appRoutes: Routes = [
  { path: 'home', component: UserComponent },
  { path: 'usersList', component: UsersListComponent },
  { path: 'calendar', component: CalendarCoursesComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersListComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent,
    SignInFormComponent,
    SignUpDialogComponent,
    CalendarCoursesComponent,
    RolesComponent,
    CoursesComponent,
    AddCourseDialogComponent,
    CourseDialogComponent,
    AddRoleDialogComponent,
    DeleteRoleDialogComponent
  ],
  imports: [
    MatCheckboxModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DemoUtilsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,       
    MatNativeDateModule,        
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    CdkTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CdkTreeModule,
    MatCheckboxModule
  ],
  bootstrap: [AppComponent],
  providers: [UsersListService],
  entryComponents: [UpdateUserDialogComponent,
    DeleteUserDialogComponent,
    RolesComponent
  ]
})
export class AppModule { }
