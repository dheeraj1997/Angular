import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const attendanceUrl = '/api/attendance/';

@Injectable()
export class AttendanceService {

  constructor(public http: Http) {
  }

  saveAttendance(data) {
    return this.http.post(attendanceUrl + 'add', data);
  }

  getAttendanceBySchoolId(sId) {
    return this.http.get(attendanceUrl + 'getBySchoolId/' + sId);
  }

  getAttendanceByTimeTableId(tId) {
    return this.http.get(attendanceUrl + 'getByTimeTableId/' + tId);
  }

  getAttendanceByClassId(cId, sId, dateHere, teacherTimetableId?) {
    let urlToSend = attendanceUrl + 'getByClassId/' + cId + '/' + sId + '/' + dateHere;
    if (teacherTimetableId) {
      urlToSend += '?teacherTimetableId=' + teacherTimetableId;
    }
    return this.http.get(urlToSend);
  }
}
