import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


const schoolUrl = '/api/school/';

@Injectable()
export class SchoolService {

  constructor(public http: Http) {
  }

  addSchool(data) {
    return this.http.post(schoolUrl + 'add', data);
  }

  addOrganizationSchool(data) {
    return this.http.post(schoolUrl + 'addOrg', data);
  }

  getAllCount() {
    return this.http.post(schoolUrl + 'getAllCount', {});
  }

  getOrganizationSchools(oId) {
    console.log('serviceconsole', oId);
    return this.http.get(schoolUrl + 'getByOrganizationId/' + oId);
  }

  getSchoolByLoginId(lId) {
    return this.http.get(schoolUrl + 'getByLoginId/' + lId);
  }

  getByUserName(userName) {
    return this.http.get(schoolUrl + 'getByUserName/' + userName);
  }

  getSchoolPeriodClasses(sId, sesId) {
    return this.http.get(schoolUrl + 'getPeriodsBySchool/' + sId + '/' + sesId);
  }

  getTodayClassAttendanceList(sId, sesId) {
    return this.http.get(schoolUrl + 'getTodayClassAttendanceList/' + sId + '/' + sesId);
  }

  getTodayClassAttendanceSummery(sId, sesId) {
    return this.http.get(schoolUrl + 'getTodayClassAttendanceSummery/' + sId + '/' + sesId);
  }

  getClassAttendanceList(sId, sesId, date) {
    return this.http.get(schoolUrl + 'getClassAttendanceList/' + sId + '/' + sesId + '/' + date);
  }

  getAttendanceListToTake(listId) {
    return this.http.get(schoolUrl + 'getAttendanceListToTake/' + listId);
  }

  getAttendanceListToView(listId) {
    return this.http.get(schoolUrl + 'getAttendanceListToView/' + listId);
  }

  getSchoolById(id) {
    return this.http.get(schoolUrl + id);
  }

  getSmsHistory(schoolId, endDate, startDate?) {
    let urlHere = schoolUrl + 'getSchoolSms/' + schoolId + '?endDate=' + endDate;
    if (startDate) {
      urlHere += '&startDate=' + startDate;
    }
    return this.http.get(urlHere);
  }

  sendBulkSms(data) {
    return this.http.post(schoolUrl + 'sendSms', data);
  }

  saveClassAttendanceTaken(data) {
    return this.http.post(schoolUrl + 'saveClassAttendanceTaken', data);
  }

  saveFees(data) {
    return this.http.post(schoolUrl + 'saveFees', data);
  }

  saveAccountantFees(data, schoolId, sessionId) {
    return this.http.post(schoolUrl + 'saveAccountantFees/' + schoolId + '/' + sessionId, data);
  }

  getTotalFeesCollected(schoolId, sessionId) {
    return this.http.get(schoolUrl + 'getTotalFeesCollected/' + schoolId + '/' + sessionId);
  }

  getTodayClassAttendanceReport(schoolId, sessionId, classId, data) {
    return this.http.post(schoolUrl + 'getTodayClassAttendanceReport/' + schoolId + '/' + sessionId + '/' + classId, data);
  }

  printFeeReceipt(data) {
    return this.http.post(schoolUrl + 'getFeeReceipt/', data);
  }

  savePeriod(data) {
    return this.http.post(schoolUrl + 'savePeriod', data);
  }

  getFees(schoolId, sessionId, classId) {
    return this.http.get(schoolUrl + 'getFees/' + schoolId + '/' + sessionId + '/' + classId);
  }

  getFeesLedger(schoolId, sessionId, classId) {
    return this.http.get(schoolUrl + 'getFeesLedger/' + schoolId + '/' + sessionId + '/' + classId);
  }

  getFeesLedgerCsv(data) {
    return this.http.post(schoolUrl + 'getFeesLedgerCsv', data);
  }

  getAttendanceReportCsv(data) {
    return this.http.post(schoolUrl + 'getAttendanceReportCsv', data);
  }

  getAccountantFees(schoolId, sessionId, studentId) {
    return this.http.get(schoolUrl + 'getAccountantFees/' + schoolId + '/' + sessionId + '/' + studentId);
  }

  getPeriods(schoolId, sessionId, classId) {
    return this.http.get(schoolUrl + 'getPeriods/' + schoolId + '/' + sessionId + '/' + classId);
  }

  setCurrentSession(schoolId, sessionId) {
    return this.http.post(schoolUrl + 'setCurrentSession', {
      sessionId: sessionId,
      schoolId: schoolId
    });
  }

  editFees(data) {
    return this.http.post(schoolUrl + 'saveFees', data);
  }

  deleteFees(id) {
    return this.http.post(schoolUrl + 'deleteFees/' + id, {});
  }

  getAll(start, limit) {
    const url = schoolUrl + 'getAll?start=' + start + '&limit=' + limit;
    return this.http.post(url, {});
  }

  deleteSchool(id) {
    return this.http.post(schoolUrl + 'deleteSchool/' + id, {});
  }

  editSchool(data) {
    return this.http.post(schoolUrl + 'editSchool', data);
  }

  editSchoolSms(schoolId, data) {
    return this.http.post(schoolUrl + 'editSchoolSms/' + schoolId, data);
  }

  editSchoolStatus(schoolId, data) {
    return this.http.post(schoolUrl + 'editSchoolStatus/' + schoolId, data);
  }

  getFeesHistory(schoolId, classId, sessionId) {
    return this.http.get(schoolUrl + 'getFeesHistory/' + schoolId + '/' + classId + '/' + sessionId);
  }
}


