import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ApiErrorService {
    error = new Subject<boolean>();
    statusCode: string;

    show(statusCode) {
        this.statusCode = statusCode;
        this.error.next(true);
    }
    hide() {
        this.error.next(false);
    }
}
