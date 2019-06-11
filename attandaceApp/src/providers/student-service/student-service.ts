import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedHttpService } from '../auth-service/auth-service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

/*
  Generated class for the StudentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentServiceProvider {

  public SUB_URL: string = "http://localhost:3000/v1/";

  constructor(public authenticatedHttpService: AuthenticatedHttpService,
    public http: Http) {
  }

  authenticate(number: string, password: string, device: string) {
    var request = {
      number: number,
      password: password,
      device: device
    };
    return this.http.post(this.SUB_URL + 'student/login', request)
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }

  authenticateUser(email: string, password: string, device: string) {
    var request = {
      email: email,
      password: password,
      device: device
    };
    return this.http.post(this.SUB_URL + 'users/login', request)
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }

  public handleAuthenticationError(error: any) {
    return Observable.throw(error.json());
  }

  signUp(data){

    return this.http.post(this.SUB_URL + 'student', data)
    .map((response: Response) => response.json())
    .catch(this.handleAuthenticationError);

  }

  signUpUser(data){

    return this.http.post(this.SUB_URL + 'users', data)
    .map((response: Response) => response.json())
    .catch(this.handleAuthenticationError);

  }

  getLectures() {
    return this.authenticatedHttpService.get(this.SUB_URL + 'lectures')
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }
  getApprove() {
    return this.authenticatedHttpService.get(this.SUB_URL + 'users/approve')
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }
  setApprove() {
    return this.authenticatedHttpService.get(this.SUB_URL + 'users/approveAll')
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }

  createLecture(data){
    return this.authenticatedHttpService.post(this.SUB_URL + 'lectures', data)
    .map((response: Response) => response.json())
    .catch(this.handleAuthenticationError);
  }

  genCode(id, code, data) {
    return this.authenticatedHttpService.post(this.SUB_URL + `lectures/${id}/${code}`,data)
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }

  enroll(data) {
    return this.authenticatedHttpService.post(this.SUB_URL + `student/enroll`,data)
      .map((response: Response) => response.json())
      .catch(this.handleAuthenticationError);
  }

}
