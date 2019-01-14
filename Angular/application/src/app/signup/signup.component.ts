import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserDataService } from "../services/user-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user : User = {
        name: "",
        role: "",
        username: "",
        password: ""
    }
    isSuccessful = false;
    isUsernameInUse = false;

    signUp() {
        this.userDataService.addUser(this.user).subscribe(returnedItem=>{
            if (returnedItem.code == 11000) {
                this.isUsernameInUse = true;
            } else if (returnedItem.n === 1 && returnedItem.ok === 1) {
                this.isSuccessful = true
            }
        })
    }

    routeToLogIn(){
        this.router.navigate(['/login']);
    }

    constructor(private userDataService : UserDataService, private router: Router) { }

    ngOnInit() {
    }

}
