import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service'
import {SessionService} from '../../../../../shared/services/session.service'

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-session-add',
  templateUrl: './school-admin-master-entry-session-add.component.html',
  styleUrls: ['./school-admin-master-entry-session-add.component.scss']
})
export class SchoolAdminMasterEntrySessionAddComponent implements OnInit {

  sessionData = {
    name: '',
    startDate: {},
    endDate: {},
    schoolId: '',
    comment: ''
  };
  currentSession = '';
  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  toShowData = [];
  nameToDelete = '';
  searchString: string;
  initialData: string;
  isDisable = false;

  constructor(private school: SchoolService,
              private session: SessionService,
              private router: Router,
              private alert: ToastrService) {
    // days that don't belong to current month are not visible
    // config.outsideDays = 'hidden';

    // weekends are disabled
    // config.markDisabled = (date: NgbDateStruct) => {
    //   const d = new Date(date.year, date.month - 1, date.day);
    //   return d.getDay() === 0;
    // };
  }

  ngOnInit() {
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.sessionData.schoolId = res.data._id.toString();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  save() {
    this.isDisable = true;
    if (
      !this.sessionData.schoolId ||
      !this.sessionData.startDate ||
      !this.sessionData.endDate
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    console.log('this.sessionData', this.sessionData);
    this.session.saveSession(this.sessionData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.sessionData.name = '';
        this.sessionData.startDate = {};
        this.sessionData.endDate = {};
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/admin/master/session/view']);
      });
  }
}

