import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const resultUrl = '/api/result/';


@Injectable()
export class ResultService {

  constructor(public http: Http) {
  }

  submitMarks(data) {
    return this.http.post(resultUrl + 'addResult', data);
  }

  getMarks(schoolId, sessionId, classId, examId, subjectId) {
    return this.http.get(resultUrl + 'getResult/' + schoolId + '/' + sessionId + '/' + classId + '/' + examId + '/' + subjectId);
  }

  getResultByExam(schoolId, sessionId, classId, examId) {
    return this.http.get(resultUrl + 'getResultByExam/' + schoolId + '/' + sessionId + '/' + classId + '/' + examId);
  }

  getReportCard(data) {
    return this.http.post(resultUrl + 'getReportCard', data);
  }

  getAdmitCard(data) {
    return this.http.post(resultUrl + 'getAdmitCard', data);
  }
}
