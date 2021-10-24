import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentData } from './studentData';

@Injectable({
  providedIn: 'root'
})

export class StudentsListService {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  private studentsList: StudentData[] = [
    {id:0, name: 'Maria Papadopoulou'},
    {id:1, name: 'Giorgos Athanasiou'},
    {id:2, name: 'Giorgos Papadopoulos'},
    {id:3, name: 'Matina Antoniadou'}
  ];

  getStudentsList(): StudentData[] {
    return this.studentsList;
  }

  deleteStudent(student, i){
    const options = { positionClass:'toast-bottom-right' };
    this.studentsList.splice(i, 1);
    this.toastr.error('Student ID: ' + student.id + ' - Student name: ' + student.name, 'DELETED', options);
  }

  getStudentDetails(student){
    if (student.id !== null && student.name !== '' && student.name !== undefined){
      this.router.navigate(['/studentDetails', student.id, student.name]);
    } 
  }

}
