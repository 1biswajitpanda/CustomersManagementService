import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersGetService {

    constructor(private http: HttpClient) { }

    getCustomers():Observable<Customer[]> {
        return this.http.get<Customer[]>('http://localhost:9999/api/customer');
    }
}
