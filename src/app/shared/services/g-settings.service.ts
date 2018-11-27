import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const gSettingUrl = '/api/gSettings/';

@Injectable()

export class GSettingsService {

  constructor(public http: Http) {
  }

  saveSettings(data) {
    return this.http.post(gSettingUrl + 'addSettings', data);
  }

  getSettings(schoolId) {
    console.log('schoolId', schoolId);
    return this.http.get(gSettingUrl + 'getSettings/' + schoolId);
  }

  getClassAttendanceSettings(schoolId, sessionId) {
    console.log('schoolId', schoolId);
    console.log('sessionId', sessionId);
    return this.http.get(gSettingUrl + 'getClassAttendanceSettings/' + schoolId + '/' + sessionId);
  }

  addClassAttendanceSettings(data) {
    return this.http.post(gSettingUrl + 'addClassAttendanceSettings', data);
  }

}
