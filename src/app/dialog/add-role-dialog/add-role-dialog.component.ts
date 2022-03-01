import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent implements OnInit {

  roleForm: FormGroup;
  constructor(
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<AddRoleDialogComponent>
  ) { }

  ngOnInit(): void {
    this.roleForm = this.rolesService.initializeRolesForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addRole(){
    this.rolesService.addRole(this.roleForm.value);
  }
}
