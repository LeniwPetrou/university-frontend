import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCourseDialogComponent } from '../dialog/add-course-dialog/add-course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { Courses } from './courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  coursesList: Courses[] = [];
  displayedColumns: string[] = ['select', 'id', 'description', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Courses>(this.coursesList);
  selection = new SelectionModel<Courses>(true, []);

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog) { }
    
  ngOnInit(): void {  
    this.coursesService.getCourses().pipe().subscribe((courses: any)=>{
      this.coursesList = courses;
      this.dataSource = new MatTableDataSource<Courses>(this.coursesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addCourse(){
    const dialog = this.dialog.open(AddCourseDialogComponent, {
      width: '300px',
      disableClose: true
    });
  }
}
