import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentData } from '../studentData';
import { StudentsListService } from '../students-list.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  studentName: string;
  studentsList: StudentData[] = [];

  constructor(
    private toastr: ToastrService,
    private studentsListService: StudentsListService
    ){}

  ngOnInit(): void {
    this.getStudentsList();
  }

  addStudent(){
    const options = { positionClass:'toast-bottom-right' };
    if (this.studentName != '' && this.studentName != undefined){
      this.studentsList.push({id : this.studentsList.length, name: this.studentName});        
      console.log(this.studentsList.length);
      this.toastr.success('Student ID: ' + this.studentsList.length + ' - Student name: ' + this.studentName, 'ADDED', options);
    }
    else{
      this.toastr.info('Please, add a name of a student.', 'NO STUDENT ADDED', options);
    }
  }

  checkIfStudentListIsEmpty(){
    if ( this.studentsList.length > 0){
      return false;
    }
    else {
      return true;
    }
  }

  deleteStudent(student, i){
    this.studentsListService.deleteStudent(student, i);
  }

  getStudentDetails(student){
    this.studentsListService.getStudentDetails(student);
  }

  getStudentsList(){
    this.studentsList = this.studentsListService.getStudentsList();
  }

}
