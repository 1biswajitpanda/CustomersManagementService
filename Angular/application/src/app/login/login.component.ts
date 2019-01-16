//window.localStorage stores the data forever until the user clears it
//while window.sessionStorage stores the data for the session. It is lost when the user closes the tab


import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserDataService } from "../services/user-data.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user:User = {
        name: "",
        role: "",
        username: "",
        password: ""
    }
    isSuccessful = true;

    verifyUser(){
        this.userDataService.verifyUser(this.user).subscribe(returnedItem=>{
            console.log(`Inside login.component.ts : returnedItem : ${returnedItem}`);
            window.sessionStorage.setItem('token',returnedItem.token)
            console.log(window.sessionStorage.getItem('token'));
            if (!returnedItem.errorMessage) { this.router.navigate(['/customers']) }
            else { this.isSuccessful = false }
        })
    }

    constructor(private userDataService: UserDataService, private router: Router) { }

    ngOnInit() {
    }

}
