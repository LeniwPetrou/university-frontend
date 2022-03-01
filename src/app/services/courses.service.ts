import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { coursesConsts } from "../courses/courses-data.const";

@Injectable({
    providedIn: 'root'
  })
  
  export class CoursesService {
    @Output() eventEmitted = new EventEmitter();
    coursesForm: FormGroup;
    baseUrl: string = `${environment.apiBaseUrl}${coursesConsts.urls.baseCourses}`;
    
    constructor(
      private http: HttpClient,
      private snackBar: MatSnackBar,
      private router: Router
    ) { }

    initializeCoursesForm() {
      this.coursesForm = new FormGroup({
        id: new FormControl(''),
        description: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required)
      });  
      return this.coursesForm ;
    }

    getCourses(){
      return this.http.get(`${this.baseUrl}/findAllCourses`)
    }

    addCourse(course){
      return this.http.post(`${this.baseUrl}/addCourses`, course).subscribe(
        res => { 
          this.reloadCurrentRoute();
          this.snackBar.open('Course: ' + course.description +  ' added successfully.' , 'Close',{
            duration: 2000
          });
        },
        err => {
          this.snackBar.open('Error on adding new course.' , 'Close',{
            duration: 2000
          });
        }
      ); 
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }
  }