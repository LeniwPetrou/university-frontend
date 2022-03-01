import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-user-user-dialog',
  templateUrl: './update-user-dialog.component.html'
})
export class UpdateUserDialogComponent implements OnInit {

  constructor(
    private usersListService: UsersListService,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
    this.usersListService.reloadCurrentRoute();
  }

  updateUser(){
    this.dialogRef.close();
    this.usersListService.updateUser(this.data);
  }
}
