import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersListService } from 'src/app/services/users-list.service';


@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html'
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    private usersListService: UsersListService,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteUser(){
    this.dialogRef.close();
    this.usersListService.deleteUser(this.data);
  }

}
