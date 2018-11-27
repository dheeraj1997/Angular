import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const schoolTimeTableUrl = '/api/schoolTimeTable/';

@Injectable()
export class TimeTableService {

  constructor(public http: Http) {
  }

  saveTimeTable(data) {
    return this.http.post(schoolTimeTableUrl + 'add', data);
  }

  saveSimpleTimeTable(data) {
    return this.http.post(schoolTimeTableUrl + 'addSimple', data);
  }

  getTimeTableBySchoolId(sId) {
    return this.http.get(schoolTimeTableUrl + 'getBySchoolId/' + sId);
  }

  getBySchoolAndClassId(sId, cId, sesId) {
    return this.http.get(schoolTimeTableUrl + 'get/' + sId + '/' + cId + '/' + sesId);
  }

  getDayTimeTableByTeacherId(tId, sesId, day) {
    return this.http.get(schoolTimeTableUrl + 'getDayTimeTableByTeacherId/' + tId + '/' + sesId + '?day=' + day);
  }

  getTeacherAttendanceById(tId) {
    return this.http.get(schoolTimeTableUrl + 'getTeacherAttendanceById/' + tId);
  }

  getTimetablePdf(data) {
    return this.http.post(schoolTimeTableUrl + 'getTimetablePdf', data);
  }
}

