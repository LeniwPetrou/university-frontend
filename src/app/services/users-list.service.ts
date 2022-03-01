import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { userConsts } from '../user/user-data.const';

@Injectable({
  providedIn: 'root'
})

export class UsersListService {
  @Output() emittedEvent = new EventEmitter();
  userForm: FormGroup;
  authenticatedUser: any;
  userIsAuthenticated: any;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  baseUserUrl: string = `${environment.apiBaseUrl}${userConsts.urls.baseUser}`;

  initializeUserForm() {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required)
    });
    return this.userForm ;
  }

  initializeUserFormWithValues(user) {
    this.userForm = new FormGroup({
      id: new FormControl(user.id === null ? '' : user.id),
      firstname: new FormControl( user.firstname === null ? '' : user.firstname, Validators.required),
      lastname: new FormControl(user.lastname === null ? '' : user.lastname , Validators.required),
      email: new FormControl(user.email === null ? '' : user.email , [Validators.required, Validators.email]),
      username: new FormControl(user.username === null ? '' : user.username, Validators.required),
      password: new FormControl(user.password === null ? '' : user.password, Validators.required),
      roleId: new FormControl(user.roleId === null ? '' : user.roleId, Validators.required)
    });
    return this.userForm ;
  }

  getUsers() {
    return this.http.get(`${this.baseUserUrl}/findAllUsers`)
  }

  addUser(user){
    return this.http.post(`${this.baseUserUrl}/addUser`,user).subscribe(
      res => {
        this.reloadCurrentRoute();
        this.snackBar.open('User: ' + user.firstname + ' ' + user.lastname  +  ' added successfully.' , 'Close',{
          duration: 2000
        });
      },
      err => {
        this.snackBar.open('Error on adding new user.' , 'Close',{
          duration: 2000
        });
      }
    ); 
  }
  
  deleteUser(deletedUsersList) {
    return this.http.post(`${this.baseUserUrl}/delete`,deletedUsersList)
    .subscribe(
      res => {
        this.snackBar.open('User successfully deleted.' , 'Close',{
          duration: 2000
        });
        this.reloadCurrentRoute();
      },
      err => {
        this.snackBar.open('Error on delete user.' , 'Close',{
          duration: 2000
        });
      })
    }

  updateUser(user){
    return this.http.put(`${this.baseUserUrl}/updateUser`,user).subscribe(
      res => {
      this.snackBar.open('User successfully updated.' , 'Close',{
        duration: 2000
      });
      this.reloadCurrentRoute();
    },
    err => {
      this.snackBar.open('User failed to be updated.' , 'Close',{
        duration: 2000
      });
    }); 
  }

  authenticateUser(user){
    return this.http.get(`${this.baseUserUrl}/authenticateUser/${user.username}/${user.password}`,)
    .subscribe(
        data => {
        this.authenticatedUser = data;
        if (this.authenticatedUser != null){
          this.userIsAuthenticated = true;
          this.emittedEvent.emit(this.authenticatedUser);
          if (this.authenticatedUser.roleId === 1){
            this.isAdmin = true;
          }
          else {            
            this.isAdmin = false;
          }
          this.emittedEvent.emit(this.isAdmin);
          localStorage.setItem('connectedUser', JSON.stringify(this.authenticatedUser));
          this.router.navigate(['/home']);
          this.snackBar.open('Successful authentication.' , 'Close',{
            duration: 2000
          });
        }
        else{
          this.snackBar.open('Authentication failed.' , 'Close',{
            duration: 2000
          });
        }
      },
      err => {
        this.snackBar.open('Authentication failed.' , 'Close',{
          duration: 2000
        });
      }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
