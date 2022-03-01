import { Component } from '@angular/core';
import { UsersListService } from './services/users-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-project'; 
  
  constructor(public loginService: UsersListService){
  }

  ngOnInit() {   
  }
}
