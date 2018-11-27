import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LoginUser} from '../exports';


const authUrl = '/auth/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
  }

  login(user: LoginUser) {
    let body = {
      username: user.username, password: user.password, fcmToken: ''
    };
    if (user.fcmToken) {
      body = {
        username: user.username, password: user.password, fcmToken: user.fcmToken
      };
    }
    return this.http.post(authUrl + 'login', body);
  }

  forget(username) {
    return this.http.post(authUrl + 'forget', {username: username});
  }

  submitForgetOtp(data) {
    return this.http.post(authUrl + 'submitForgetOtp', data);
  }

  submitForgetPassword(data) {
    return this.http.post(authUrl + 'submitForgetPassword', data);
  }
}

