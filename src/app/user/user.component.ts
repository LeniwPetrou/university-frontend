import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './user';
import { UsersListService } from '../services/users-list.service';
import { Roles } from '../roles/roles';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable({providedIn: 'root'})
export class UserComponent implements OnInit {

  connectedUserForm: FormGroup;
  userConnected : any;
  user: User;
  rolesList: Roles[] = [];

  constructor(
    private usersListService: UsersListService,
    private rolesService: RolesService
    ){}

    ngOnInit(): void {
      this.userConnected = localStorage.getItem('connectedUser');
      this.user = JSON.parse(this.userConnected);
      this.connectedUserForm = this.usersListService.initializeUserFormWithValues(this.user);
      this.rolesService.getRoles().pipe().subscribe((roles: any)=>{
        this.rolesList = roles;
      });
    }

    updateUser(){
      this.usersListService.updateUser(this.connectedUserForm.value);
    }

    change(event)
    {
      if(event.isUserInput) {
      }
    }
}
