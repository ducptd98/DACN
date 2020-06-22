import { Injectable } from '@angular/core';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';

@Injectable({
  providedIn: 'root'
})
export class FacebookCustomService {

  initParams: InitParams = {
    appId: '1098638313668438',
    xfbml: true,
    version: 'v7'
  };
  fb = new FacebookService();

  constructor() {

    this.fb.init(this.initParams);

  }
  share(url: string) {

    const params: UIParams = {
      href: url,
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

  }
}
