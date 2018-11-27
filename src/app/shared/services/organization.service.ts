import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const organizationUrl = '/api/organization/';

@Injectable()

export class OrganizationService {

  constructor(public http: Http) {
  }

  saveOrganization(data) {
    return this.http.post(organizationUrl + 'addOrganization', data);
  }

  getOrganizationByLoginId(loginId) {
    return this.http.get(organizationUrl + 'getByLoginId/' + loginId);
  }

  getAll() {
    return this.http.post(organizationUrl + 'getAll/', {});
  }

  deleteOrganization(id) {
    return this.http.post(organizationUrl + 'deleteOrganization/' + id, {});
  }

  getOrganizationById(oId) {
    return this.http.get(organizationUrl + oId);
  }

  editOrganization(data) {
    return this.http.post(organizationUrl + 'editOrganization', data);
  }
}
