import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView} from 'angular-calendar';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { coursesConsts } from '../courses/courses-data.const';
import { CourseDialogComponent } from '../dialog/course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-calendar-courses',
  templateUrl: './calendar-courses.component.html',
  styleUrls: ['./calendar-courses.component.css']
})
export class CalendarCoursesComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  events:Array<CalendarEvent>[] = [];
  coursesList: any;
  course:any;
  baseUrl: string = `${environment.apiBaseUrl}${coursesConsts.urls.baseCourses}`;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
 
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.initializeCalender();
  }

  initializeCalender(){
    this.coursesService.getCourses().pipe().subscribe((courses: any)=>{
      this.coursesList = courses;
      for(let i = 0; i < this.coursesList.length; i++){
        this.course = { start: new Date(this.coursesList[i].startDate), end:new Date(this.coursesList[i].endDate), title: this.coursesList[i].description};
        this.events.push(this.course) ;  
      }
      this.refresh.next();
    })
  }

  switchView (viewType){
    this.view = viewType;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const dialog = this.dialog.open(CourseDialogComponent, {
      width: '280px',
      disableClose: true,
      data: event
    });
  }
}



