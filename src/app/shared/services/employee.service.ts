import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const employeeUrl = '/api/employee/';

@Injectable()
export class EmployeeService {

  constructor(public http: Http) {
  }

  saveEmployee(data) {
    return this.http.post(employeeUrl + 'addEmployee', data);
  }

  getEmployeeByLoginId(loginId) {
    return this.http.get(employeeUrl + 'getByLoginId/' + loginId);
  }

  getAll() {
    return this.http.post(employeeUrl + 'getAll/', {});
  }

  deleteEmployee(id) {
    return this.http.post(employeeUrl + 'deleteEmployee/' + id, {});
  }

  getEmployeeById(eId) {
    return this.http.get(employeeUrl + eId);
  }

  editEmployee(data) {
    return this.http.post(employeeUrl + 'editEmployee', data);
  }
}

