import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-notice',
  templateUrl: './school-accountant-notice.component.html',
  styleUrls: ['./school-accountant-notice.component.scss']
})
export class SchoolAccountantNoticeComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: {
    _id: '',
    name: '',
    schoolId: ''
  };
  staffData: {
    _id: '',
    schoolId: ''
  };
  noticeData = [];

  constructor(private notice: NoticeService,
              private staff: StaffService,
              private school: SchoolService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(sres => {
        console.log('teacher res', sres);
        if (sres && sres.data && sres.data._id) {
          this.staffData = sres.data;
          {
            console.log('schoolId', sres.data.schoolId);
            if (sres.data.schoolId) {
              this.notice.getNoticeBySchoolId(sres.data.schoolId, 'accountants')
                .map(z => z.json())
                .subscribe(nres => {
                  console.log('nres', nres);
                  this.noticeData = nres.data;
                });

            } else {
              this.alert.error('unable to find any notice ' + ' Please Reload!', 'Error');
            }
            this.school.getSchoolById(this.staffData.schoolId)
              .map(x => x.json())
              .subscribe(res => {
                console.log('school res', res);
                if (res.data) {
                  this.schoolData = res.data;
                } else {
                  this.alert.error('No school found from this school id!', 'Error');
                }
              });
          }
        }
        else {
          this.alert.error('No teacher found from this login id!', 'Error');
        }
      });


  }

}
