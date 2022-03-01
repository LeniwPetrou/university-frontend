import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { rolesConsts } from "../roles/roles-date.const";

@Injectable({
    providedIn: 'root'
  })
  
  export class RolesService {
    @Output() eventEmitted = new EventEmitter();
    rolesForm: FormGroup;

    constructor(
      private http: HttpClient,
      private router: Router,
      private snackBar: MatSnackBar
    ) { }
  
    baseRoleUrl: string = `${environment.apiBaseUrl}${rolesConsts.urls.baseRole}`;

    getRoles(){
      return this.http.get(`${this.baseRoleUrl}/findAllRoles`)
    }

    addRole(role){
      return this.http.post(`${this.baseRoleUrl}/addRole`,role).subscribe(
        res => {
          this.reloadCurrentRoute();
          this.snackBar.open('Role: ' + role.description +  ' added successfully.' , 'Close',{
            duration: 2000
          });
        },
        err => {
          this.snackBar.open('Error on adding new role.' , 'Close',{
            duration: 2000
          });
        }
      ); 
    }

    initializeRolesForm(){
      this.rolesForm = new FormGroup({
        id: new FormControl(''),
        description: new FormControl('', Validators.required),
      });  
      return this.rolesForm ;
    }

    deleteRole(deletedRolesList) {
      return this.http.post(`${this.baseRoleUrl}/delete`,deletedRolesList)
      .subscribe(
        res => {
          this.snackBar.open('Role successfully deleted.' , 'Close',{
            duration: 2000
          });
          this.reloadCurrentRoute();
        },
        err => {
          this.snackBar.open('Error on delete role.' , 'Close',{
            duration: 2000
          });
      })
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
  }