import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: {id: number, name: string};

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getStudentDetails();
  }

  getStudentDetails(): void {
    this.student = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']

    };
  }

}
