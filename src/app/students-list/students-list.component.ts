import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentsListService } from '../students-list.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

@Injectable()
export class StudentsListComponent implements OnInit {

  @Input() studentsList: any[];

  constructor(
    private studentsListService: StudentsListService) { }

  ngOnInit(): void {
    this.studentsList = this.studentsListService.getStudentsList();
  }

  deleteStudent(student, i){
    this.studentsListService.deleteStudent(student, i);
  }

  getStudentDetails(student){
    this.studentsListService.getStudentDetails(student);
  }
}
