import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const examinationUrl = '/api/examination/';

@Injectable()
export class ExaminationService {

  constructor(public http: Http) {
  }

  saveExam(data) {
    return this.http.post(examinationUrl + 'addExam', data);
  }

  saveExamSettings(data) {
    return this.http.post(examinationUrl + 'addExamSettings', data);
  }

  getExamBySchoolId(sId, sessId?) {
    return this.http.get(examinationUrl + 'getBySchoolId/' + sId + '/' + sessId);
  }

  getExamSettingsBySchoolId(sId, sessId?) {
    return this.http.get(examinationUrl + 'getSettingsBySchoolId/' + sId + '/' + sessId);
  }

  deleteExam(id) {
    return this.http.post(examinationUrl + 'deleteExam/' + id, {});
  }

  getExamById(eId) {
    return this.http.get(examinationUrl + eId);
  }

  editExam(data) {
    return this.http.post(examinationUrl + 'edit', data);
  }
}
