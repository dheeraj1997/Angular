import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const staffUrl = '/api/staff/';

@Injectable()
export class StaffService {

  constructor(public http: Http) {
  }

  saveStaff(data) {
    return this.http.post(staffUrl + 'add', data);
  }

  getStaffById(eId) {
    return this.http.get(staffUrl + eId);
  }

  getStaffBySchoolId(sId) {
    return this.http.get(staffUrl + 'getBySchoolId/' + sId);
  }

  editStaff(data) {
    return this.http.post(staffUrl + 'edit', data);
  }

  deleteStaff(id) {
    return this.http.post(staffUrl + 'delete/' + id, {});
  }

  getStaffByLoginId(loginId) {
    return this.http.get(staffUrl + 'getByLoginId/' + loginId);
  }

  getStaffCount(schoolId) {
    return this.http.get(staffUrl + 'getStaffCount/' + schoolId);
  }

  getCsv(type) {
    return window.open(staffUrl + 'get/csv/' + type);
  }

  addStaffCsv(data) {
    return this.http.post(staffUrl + 'add/csv', data);
  }
}

