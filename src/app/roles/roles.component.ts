import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddRoleDialogComponent } from '../dialog/add-role-dialog/add-role-dialog.component';
import { DeleteRoleDialogComponent } from '../dialog/delete-role-dialog/delete-role-dialog.component';
import { RolesService } from '../services/roles.service';
import { Roles } from './roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  rolesList: Roles[] = [];
  displayedColumns: string[] = ['select', 'id', 'description'];
  dataSource = new MatTableDataSource<Roles>(this.rolesList);
  selection = new SelectionModel<Roles>(true, []);
  deletedRolesList: any[] = [];

  constructor(
    private rolesService: RolesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {  
    this.rolesService.getRoles().pipe().subscribe((roles: any)=>{
      this.rolesList = roles;
      this.dataSource = new MatTableDataSource<Roles>(this.rolesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteRole(){
    if (this.selection.selected.length !== 0){
      this.selection.selected.forEach(item => {
        this.deletedRolesList.push(item);
      });
      const dialog = this.dialog.open(DeleteRoleDialogComponent, {
        width: '250px',
        disableClose: true,
        data: this.deletedRolesList
      });
    }
    else{
      this.snackBar.open('Please select a role.' , 'Close',{
        duration: 2000
      });
    }
  }

  addRole(){
    const dialog = this.dialog.open(AddRoleDialogComponent, {
      width: '300px',
      disableClose: true
    });
  }
}
