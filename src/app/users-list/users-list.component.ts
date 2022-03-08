import { ChangeDetectorRef, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user/user';
import { UsersListService } from '../services/users-list.service';
import { UpdateUserDialogComponent } from '../dialog/update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from '../dialog/delete-user-dialog/delete-user-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { SignUpDialogComponent } from '../dialog/sign-up-dialog/sign-up-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

@Injectable()
export class UsersListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usersList: User[] = [];
  users: any;
  deletedUsersList: any[] = [];
  displayedColumns: string[] = ['select','id', 'firstname', 'lastname', 'email', 'action'];
  selection = new SelectionModel<User>(true, []);
  data = Object.assign(this.usersList);
  dataSource = new MatTableDataSource<User>(this.usersList);
  
  constructor(
    private usersListService: UsersListService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usersListService.getUsers().pipe().subscribe((res):any => {
      this.users = res;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  updateUser(row: User) {
    const dialog = this.dialog.open(UpdateUserDialogComponent, {
      width: '250px',
      disableClose: true,
      data: row
    });
  }

  deleteUser() {
    if (this.selection.selected.length !== 0){
      this.selection.selected.forEach(item => {
        this.deletedUsersList.push(item);
      });
      const dialog = this.dialog.open(DeleteUserDialogComponent, {
        width: '250px',
        disableClose: true,
        data: this.deletedUsersList
      });
    }
    else{
      this.snackBar.open('Please select a user.' , 'Close',{
        duration: 2000
      });
    }
  }

  addUser(){
    const dialog = this.dialog.open(SignUpDialogComponent, {
      width: '300px',
      disableClose: true
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
}
