import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const classUrl = '/api/class/';

@Injectable()
export class ClassService {

  constructor(public http: Http) {

  }

  saveClass(data) {
    return this.http.post(classUrl + 'add', data);
  }

  editClass(data) {
    return this.http.post(classUrl + 'edit', data);
  }

  deleteClass(id) {
    return this.http.post(classUrl + 'delete/' + id, {});
  }

  getClassBySchoolId(sId) {
    return this.http.get(classUrl + 'getBySchoolId/' + sId);
  }

  getClassById(cId) {
    return this.http.get(classUrl + cId);
  }
  getClassesCount(sId) {
    return this.http.get(classUrl + 'getClassCount/' + sId);
  }
}

