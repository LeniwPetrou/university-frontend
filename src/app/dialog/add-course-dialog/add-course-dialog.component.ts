import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { CoursesService } from 'src/app/services/courses.service';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html'
})
export class AddCourseDialogComponent implements OnInit {

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  courseForm: FormGroup;
  constructor(
    private coursesService: CoursesService,
    public dialogRef: MatDialogRef<SignUpDialogComponent>
  ) { }

  ngOnInit(): void {
    this.courseForm = this.coursesService.initializeCoursesForm();
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  addCourse() {
    this.coursesService.addCourse(this.courseForm.value);
  }
}
