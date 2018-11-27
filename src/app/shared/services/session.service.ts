import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const sessionUrl = '/api/session/';

@Injectable()
export class SessionService {

  constructor(public http: Http) {
  }

  saveSession(data) {
    return this.http.post(sessionUrl + 'add', data);
  }

  editSession(data) {
    return this.http.post(sessionUrl + 'edit', data);
  }

  deleteSession(id) {
    return this.http.post(sessionUrl + 'delete/' + id, {});
  }

  getSessionBySchoolId(sId) {
    return this.http.get(sessionUrl + 'getBySchoolId/' + sId);
  }

  getSessionById(sId) {
    return this.http.get(sessionUrl + sId);
  }
}

