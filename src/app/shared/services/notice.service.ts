import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

const noticeUrl = '/api/notice/';

@Injectable()
export class NoticeService {

  constructor(public http: Http) {
  }

  saveNotice(data) {
    return this.http.post(noticeUrl + 'addNotice', data);
  }

  editNotice(data) {
    return this.http.post(noticeUrl + 'edit', data);
  }

  deleteNotice(id) {
    return this.http.post(noticeUrl + 'delete/' + id, {});
  }

  getNoticeBySchoolId(sId, target?) {
    let url = noticeUrl + 'getNoticesBySchoolId/' + sId;
    if (target) {
      url += '?target=' + target
    }
    return this.http.get(url);
  }

  getDraftBySchoolId(sId) {
    return this.http.get(noticeUrl + 'getDraftBySchoolId/' + sId);
  }

  getNoticeById(nId) {
    return this.http.get(noticeUrl + nId);
  }
}
