import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const userUrl = '/api/user/';

@Injectable()
export class UserService {

  constructor(public http: Http) {
  }

  changePassword(userId, data) {
    return this.http.post(userUrl + 'changePassword/' + userId, data);
  }

  uploadProfilePicture(data) {
    return this.http.post(userUrl + 'add/profile/', data);
  }

  uploadLogoPicture(data) {
    return this.http.post(userUrl + 'add/logo/', data);
  }


}

