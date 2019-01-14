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
    isSuccessful = false;

    verifyUser(){
        this.userDataService.verifyUser().subscribe(returnedItem=>{
            if (returnedItem.status === 1 ) { this.router.navigate(['/customers']) }
        })
    }

    constructor(private userDataService: UserDataService, private router: Router) { }

    ngOnInit() {
    }

}
