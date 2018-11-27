import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const guardianUrl = '/api/guardian/';

@Injectable()
export class GuardianService {

  constructor(public http: Http) {
  }

  getGuardiansCountBySchoolAdmId(schoolAdmId) {
    return this.http.get(guardianUrl + 'getGuardiansCount/' + schoolAdmId);
  }

}

