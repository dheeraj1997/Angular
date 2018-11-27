import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';

const ls = localStorage;
const today = new Date();


@Component({
  selector: 'app-school-admin-message-history',
  templateUrl: './school-admin-message-history.component.html',
  styleUrls: ['./school-admin-message-history.component.scss']
})
export class SchoolAdminMessageHistoryComponent implements OnInit {

  searchString: string;
  numbersToView = [];
  historyEndDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  historyStartDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  initialData: string;
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    smsCount: {
      used: 0,
      total: 0
    }
  };
  toShowData = [];

  constructor(private school: SchoolService,
              private config: NgbDatepickerConfig,
              private modalService: NgbModal,
              private alert: ToastrService) {
    config.maxDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  ngOnInit() {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    this.historyStartDate = {year: yesterday.getFullYear(), month: yesterday.getMonth() + 1, day: yesterday.getDate()};
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.getHistoryData();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getHistoryData() {
    const endString = this.historyEndDate.day + '-' + this.historyEndDate.month + '-' + this.historyEndDate.year;
    const startString = this.historyStartDate.day + '-' + this.historyStartDate.month + '-' + this.historyStartDate.year;
    this.school.getSmsHistory(this.schoolData._id, endString, startString)
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          this.toShowData = res.data;
          console.log('toShowData', this.toShowData);
        } else {
          this.alert.error(res.message, 'Error!!');
        }
      })
  }

  showToSentNumbers(sms, content) {
    this.numbersToView = sms.sentTo;
    this.modalService.open(content)
      .result.then((result) => {
      console.log('result', result);
    })
  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

}
