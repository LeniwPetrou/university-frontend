import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Roles } from 'src/app/roles/roles';
import { RolesService } from 'src/app/services/roles.service';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html'
})
export class SignUpDialogComponent implements OnInit {

  rolesList: Roles[] = [];
  userForm: FormGroup;
  signUpUser: any;
  constructor(
    private rolesService: RolesService,
    private usersListService: UsersListService,
    public dialogRef: MatDialogRef<SignUpDialogComponent>
  ) { }

  ngOnInit(): void {
    this.userForm = this.usersListService.initializeUserForm();
    this.getRoles();
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  signUp() {
    this.usersListService.addUser(this.userForm.value);
  }

  getRoles(){
    this.rolesService.getRoles().pipe().subscribe((roles: any)=>{
      this.rolesList = roles;
    });
  }

  change(event)
  {
    if(event.isUserInput) {
    }
  }
}
