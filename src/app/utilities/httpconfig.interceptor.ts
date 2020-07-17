import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export default class HttpConfigInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do something
                    // console.log('event', event);

                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                console.log('error', error);
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                if (error.message === 'Token has expired') {
                    localStorage.clear();
                    window.location.reload();
                }
                console.log('@@@ error response', data);
                return throwError(error);
            })
        );
    }
}
