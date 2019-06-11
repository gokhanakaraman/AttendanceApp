import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';
import { NavController } from "ionic-angular";
import { LoginPage } from "../../pages/login/login";
import { AppConstants } from "../../app/variables";

@Injectable()
export class AuthenticatedHttpService extends Http {

  appValues;
  constructor(backend: XHRBackend, requestOptions: RequestOptions, public storage: Storage) {
    super(backend, requestOptions);
    this.getAppToken();
  }

  request(url: string | Request, requestOptions?: RequestOptionsArgs): Observable<Response> {
    this.getAppToken();
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!requestOptions) {
        // let's make option object
        requestOptions = { headers: new Headers() };
      }
      requestOptions.headers.set('Authorization', this.appValues.token);
      requestOptions.headers.set('Content-Type', 'application/json');

    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', this.appValues.token);
      url.headers.set('Content-Type', 'application/json');
    }
    return super.request(url, requestOptions).catch(this.catchAuthError(this));
  }

  catchAuthError(self: AuthenticatedHttpService) {
    return (res: Response) => {
      if (res.status === 401) {
        if (res.json().code == 1001) {
          this.logOut();
        }
      }
      return Observable.throw(res);
    };
  }

  getAppToken() {

    /*try {
      appValues = JSON.parse(localStorage.getItem('AppValues'))
    } catch (error) {
      this.logOut();
    }*/
    //this.logger.log("APP_TOKEN", appValues.token);
    this.appValues=AppConstants.appValues;
    
  }

  logOut() {
    this.storage.remove('AppValues');
    console.log('LOG Out Triggered');
    AppConstants.appValues=null;
    /*this.nav.setRoot(LoginPage)*/
  }
}

export function AuthenticatedHttpServiceFactory(backend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
  return new AuthenticatedHttpService(backend, requestOptions, storage);
}
