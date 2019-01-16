import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(private http:HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    addUser(user:User) : Observable<any> {
        return this.http.post('http://localhost:9999/api/user',user,this.httpOptions)
    }

    //TODO : Change the logic
    verifyUser(user:User) : Observable<any> {
        return this.http.post('http://localhost:9999/login',user,this.httpOptions)
    }
}
