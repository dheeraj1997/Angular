import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const subjectUrl = '/api/subject/';

@Injectable()
export class SubjectService {

  constructor(public http: Http) {
  }

  saveSubject(data) {
    return this.http.post(subjectUrl + 'add', data);
  }

  getSubjectBySchoolId(sId) {
    return this.http.get(subjectUrl + 'getBySchoolId/' + sId);
  }

  editSubject(data) {
    return this.http.post(subjectUrl + 'edit', data);
  }

  deleteSubject(id) {
    return this.http.post(subjectUrl + 'delete/' + id, {});
  }

  getSubjectById(cId) {
    return this.http.get(subjectUrl + cId);
  }
  getSubjectsCount(sId) {
    return this.http.get(subjectUrl + 'getSubjectCount/' + sId);
  }
}

