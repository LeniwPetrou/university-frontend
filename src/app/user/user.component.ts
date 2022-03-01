import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from './user';
import { userConsts } from './user-data.const';
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

  userName: string;
  usersList: User[] = [];
  srvBaseUserUrl: string = `${environment.apiBaseUrl}${userConsts.urls.baseUser}`;
  userForm: FormGroup;
  enableEdit = false;
  enableEditIndex = null;
  userConnected : any;
  user: User;
  rolesList: Roles[] = [];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 7];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private toastr: ToastrService,
    private usersListService: UsersListService,
    private http: HttpClient,
    private rolesService: RolesService
    ){}

    ngOnInit(): void {
      this.userConnected = localStorage.getItem('connectedUser');
      console.log('retrievedObject: ', JSON.parse(this.userConnected));
      this.user = JSON.parse(this.userConnected);
      this.userForm = this.usersListService.initializeUserFormLa(this.user);
      this.rolesService.getRoles().pipe().subscribe((roles: any)=>{
        this.rolesList = roles;
      });
    }

    updateUser(){
      this.usersListService.updateUser(this.userForm.value);
    }

    
  change(event)
  {
    if(event.isUserInput) {
      console.log(event.source.value, event.source.selected);
    }
  }
  }
