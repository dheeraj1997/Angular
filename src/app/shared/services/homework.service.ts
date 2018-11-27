import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

const homeworkUrl = '/api/homework/';


@Injectable()
export class HomeworkService {

  constructor(public http: Http) {
  }

  submitHomework(data){
  	return this.http.post(homeworkUrl + 'addHomework', data);
  }
   editHomework(data) {
    return this.http.post(homeworkUrl + 'edit', data);
  }

  deleteHomework(id) {
    return this.http.post(homeworkUrl + 'delete/' + id, {});
  }

  getHomeworkBySchoolTeacher(sId, tId) {
    return this.http.get(homeworkUrl + 'getHomeworkBySchoolTeacher/' + sId + '/' + tId);
  }

  getHomeworkById(hId) {
    return this.http.get(homeworkUrl + hId);
  }
}
