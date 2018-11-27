import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const teacherUrl = '/api/teacher/';

@Injectable()
export class TeacherService {

  constructor(public http: Http) {
  }

  saveTeacher(data) {
    return this.http.post(teacherUrl + 'add', data);
  }

  getTeacherBySchoolId(sId) {
    return this.http.get(teacherUrl + 'getBySchoolId/' + sId);
  }

  editTeacher(data) {
    return this.http.post(teacherUrl + 'edit', data);
  }

  deleteTeacher(id) {
    return this.http.post(teacherUrl + 'delete/' + id, {});
  }

  getTeacherByLoginId(loginId) {
    return this.http.get(teacherUrl + 'getByLoginId/' + loginId);
  }

  getTeachersCount(schoolId) {
    return this.http.get(teacherUrl + 'getTeachersCount/' + schoolId);
  }

  getTeacherById(tId) {
    return this.http.get(teacherUrl + 'getTeacherById/' + tId);
  }

  getCsv(type) {
    return window.open(teacherUrl + 'get/csv/' + type);
  }

  addTeacherCsv(data) {
    return this.http.post(teacherUrl + 'add/csv', data);
  }
}

