import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialogComponent } from '../dialog/sign-up-dialog/sign-up-dialog.component';
import { UsersListService } from '../services/users-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
  userForm: FormGroup;
  constructor(
    private usersListService: UsersListService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userForm = this.usersListService.initializeUserForm();
  }

  submit() {
    if (this.userForm.value.username != undefined && this.userForm.value.username != '' && this.userForm.value.password != undefined && this.userForm.value.password != ''){
      this.usersListService.authenticateUser(this.userForm.value);
    }
    else{
      this.snackBar.open('Please insert username and password.', 'Close',{
        duration: 2000
      });
    }
  }

  signUp(){
    const dialog = this.dialog.open(SignUpDialogComponent, {
      width: '300px',
      disableClose: true
    });
  }
}
