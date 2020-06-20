import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Alert, ALERT_TYPE } from '../../apis/model/alert';

export type ALERT_TYPE = 'success' | 'warning' | 'danger' | 'info';

export class Alert {
    message: string;
    type: ALERT_TYPE;
}


@Injectable()
export class AlertProvider {

    // tslint:disable-next-line:variable-name
    private _notifySource = new BehaviorSubject<Alert>({ type: 'info', message: '' });
    notifyItem$ = this._notifySource.asObservable();


    constructor() {
    }

    success(message) {
        this.notification_alert('success', message);
    }

    warn(message) {
        this.notification_alert('warning', message);
    }

    info(message) {
        this.notification_alert('info', message);
    }

    error(message) {
        this.notification_alert('danger', message);
    }


    notification_alert(type: ALERT_TYPE, message: string) {
        console.log(message);
        this._notifySource.next({ type, message } as Alert);
    }
}
