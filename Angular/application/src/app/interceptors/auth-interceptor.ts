import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = window.sessionStorage.getItem('token')
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(request)
        .pipe(tap(
            event => {                                          // <--  event and error needs to be provided to the tap function
            },                                                  //      And first One must be event and second one should be error
            err=>{
            if (err instanceof HttpErrorResponse){
                if (err.status == 403){
                    this.router.navigate(['/login']);
                    console.log("User need to login")
                }
            }
        }));
    }
}
