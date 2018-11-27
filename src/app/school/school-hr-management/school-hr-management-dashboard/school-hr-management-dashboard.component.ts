import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/school.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {StaffService} from '../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-hr-management-dashboard',
  templateUrl: './school-hr-management-dashboard.component.html',
  styleUrls: ['./school-hr-management-dashboard.component.scss']
})
export class SchoolHrManagementDashboardComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  staffData = {};
  schoolData = {
    _id: '',
    name: ''
  };
  noticeData: {};

  constructor(private school: SchoolService,
              private staff: StaffService,
              private notice: NoticeService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(sres => {
        if (sres && sres.data && sres.data._id) {
          this.staffData = sres.data;
          console.log('sres', sres.data);
          this.school.getSchoolById(sres.data.schoolId)
            .map(x => x.json())
            .subscribe(scres => {
              this.schoolData = scres.data;
              console.log('scres', scres.data);
              this.notice.getNoticeBySchoolId(scres.data._id, 'hrs')
                .map(x => x.json())
                .subscribe(nres => {
                  this.noticeData = nres.data;
                  console.log('nres', nres);
                });
            })
        }
      })
  }

}
