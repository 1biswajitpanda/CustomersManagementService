import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../customer';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomersDataService {

    constructor(private http: HttpClient) { }

    getCustomers():Observable<Customer[]> {
        return this.http.get<Customer[]>('http://localhost:9999/api/customer')
        .pipe(catchError(this.handleError('Error',[])))
    }

    getCustomer():Observable<Customer> {
        return this.http.get<Customer>('http://localhost:9999/api/customer/:id')
    }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    addCustomer(customer:Customer) : Observable<any> {
        return this.http.post('http://localhost:9999/api/customer',customer,this.httpOptions)
    }
    updateCustomer(customer:Customer) : Observable<any> {
        return this.http.put('http://localhost:9999/api/customer',customer,this.httpOptions)
    }
    deleteCustomer(id:number) : Observable<any> {
        return this.http.delete(`http://localhost:9999/api/customer/${id}`,this.httpOptions)
    }

    private handleError<T> (Error, result?: T) {
        return (error: any) : Observable<T> =>{
            console.log(Error + error)
            return of (result as T)
        }
    }
}
