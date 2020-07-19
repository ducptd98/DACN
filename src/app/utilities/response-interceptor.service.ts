import { ToastrService } from 'ngx-toastr';
import { AlertProvider } from './alert.provider';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiErrorService } from './api-error.service';

@Injectable()

export class ResponseInterceptorService implements HttpInterceptor {

  constructor(public apiError: ApiErrorService, public alert: AlertProvider, public toastrService: ToastrService) {
  }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map(event => event),
        catchError((error: HttpErrorResponse) => {
          const errorsStatus = [400, 401, 403, 404, 409, 500];
          if (error instanceof HttpErrorResponse) {
            if (errorsStatus.includes(error.status)) {
              this.alert.error(this._getMessage(error).message);
              this.toastrService.error(this._getMessage(error).message);
              if (this._getMessage(error).message === 'Token has expired') {
                localStorage.clear();
                window.location.reload();
            }
              return throwError(this._getMessage(error));
            } else {
              return throwError(error);
            }
          }
        }));
  }

  _getMessage(error) {
    if (!error.error) {
      return { message: '' };
    }

    try {
      return JSON.parse(error.error);
    } catch (e) {
      return error.error;
    }
  }
}
