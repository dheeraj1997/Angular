import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';


const studentUrl = '/api/students/';

@Injectable()
export class StudentService {

  constructor(public http: Http) {
  }

  addStudent(data) {
    return this.http.post(studentUrl + 'add', data);
  }

  getStudentBySchoolId(sId) {
    return this.http.get(studentUrl + 'getStudentBySchool/' + sId);
  }

  getFeesById(studentId, sessionId) {
    return this.http.get(studentUrl + 'getStudentFees/' + studentId + '/' + sessionId);
  }

  getStudentById(sId, sessId) {
    return this.http.get(studentUrl + sId + '/' + sessId);
  }

  getStudentByTransportFee(sId) {
    return this.http.get(studentUrl + sId);
  }

  editStudent(data) {
    return this.http.post(studentUrl + 'edit', data);
  }

  addTransportFee(id, data) {
    return this.http.post(studentUrl + 'transportFee', {studentId: id, data: data});
  }

  discontinueStudentTransport(id, data) {
    return this.http.post(studentUrl + 'discontinueTransportFee', {studentId: id, discontinueDate: data});
  }

  deleteStudent(id) {
    return this.http.post(studentUrl + 'delete/' + id, {});
  }

  getStudentDetailByAadhaar(aId) {
    return this.http.post(studentUrl + 'getStudentByAadhaar/', {aadhaarId: aId});
  }

  getGuardianByAadhaar(aId) {
    return this.http.get(studentUrl + 'getGuardianByAadhaar/' + encodeURI(aId));
  }

  getStudentBySchoolClass(sId, cId) {
    return this.http.get(studentUrl + 'getStudentBySchoolAndClass/' + sId + '/' + cId);
  }

  getStudentBySchoolAndClassAndSession(sId, cId, sesId) {
    return this.http.get(studentUrl + 'getStudentBySchoolAndClassAndSession/' + sId + '/' + cId + '/' + sesId);
  }

  getStudentBySchoolAndClassAndSessionByTransport(sId, cId, sesId) {
    return this.http.get(studentUrl + 'getStudentBySchoolAndClassAndSessionByTransport/' + sId + '/' + cId + '/' + sesId);
  }

  getStudentBySchoolAndClassAndSessionByTransportFees(sId, cId, sesId) {
    return this.http.get(studentUrl + 'getStudentBySchoolAndClassAndSessionByTransportFees/' + sId + '/' + cId + '/' + sesId);
  }

  getStudentByTimeTable(tId) {
    return this.http.get(studentUrl + 'getStudentByTimeTable/' + tId);
  }

  addStudentCsv(data) {
    return this.http.post(studentUrl + 'add/csv', data);
  }

  assignRollNumbers(data) {
    return this.http.post(studentUrl + 'assignRollNumbers', data);
  }

  // getCsv(type) {
  //   return window.open(studentUrl + 'get/csv/' + type);
  // }

  getAdmissionForm(studentId) {
    return this.http.get(studentUrl + 'getAdmissionForm/' + studentId);
  }

  getIdCards(schoolId, sessionId, classId) {
    return this.http.get(studentUrl + 'getIdCards/' + schoolId + '/' + sessionId + '/' + classId);
  }

  getStudentsCount(schoolId) {
    return this.http.get(studentUrl + 'getStudentsCount/' + schoolId);
  }
}

