import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {SchoolService} from '../../../../../shared/services/school.service'
import {SessionService} from '../../../../../shared/services/session.service'

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-session-edit',
  templateUrl: './school-admin-master-entry-session-edit.component.html',
  styleUrls: ['./school-admin-master-entry-session-edit.component.scss']
})

export class SchoolAdminMasterEntrySessionEditComponent implements OnInit {

  sessionData = {
    _id: '',
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    schoolId: ''
  };
  startDt: any;
  endDt: any;
  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {};

  constructor(private school: SchoolService,
              private session: SessionService,
              private router: Router,
              private route: ActivatedRoute,
              private config: NgbDatepickerConfig,
              private alert: ToastrService) {
    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    config.markDisabled = (date: NgbDateStruct) => {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0;
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sessionId = params['sessionId'];
      console.log('sessionId', sessionId);
      this.session.getSessionById(sessionId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.sessionData = res.data;
            const sd = new Date(this.sessionData.startDate);
            const ed = new Date(this.sessionData.endDate);
            this.startDt = {
              year: sd.getFullYear(),
              month: sd.getMonth() + 1,
              day: sd.getDate()
            };
            this.endDt = {
              year: ed.getFullYear(),
              month: ed.getMonth() + 1,
              day: ed.getDate()
            };
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/session/view'])
        })
    });
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.sessionData.schoolId = res.data._id.toString();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page!');
        }
      });

  }

  save() {
    if (
      !this.sessionData.schoolId ||
      !this.sessionData.startDate ||
      !this.sessionData.endDate
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    this.session.editSession(this.sessionData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/admin/master/session/add']);
      });
    console.log('sessionData', this.sessionData);
  }
}
