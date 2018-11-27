import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NoticeService} from '../../../shared/services/notice.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {SchoolService} from '../../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-notice',
  templateUrl: './school-teacher-notice.component.html',
  styleUrls: ['./school-teacher-notice.component.scss']
})
export class SchoolTeacherNoticeComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: {
    _id: '',
    name: '',
    schoolId: ''
  };
  teacherData: {
    _id: '',
    schoolId: ''
  };
  noticeData = [];

  constructor(private notice: NoticeService,
              private teacher: TeacherService,
              private school: SchoolService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.teacher.getTeacherByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(tres => {
        console.log('teacher res', tres);
        if (tres && tres.data && tres.data._id) {
          this.teacherData = tres.data;
          {
            console.log('schoolId', tres.data.schoolId);
            if (tres.data.schoolId) {
              this.notice.getNoticeBySchoolId(tres.data.schoolId, 'teachers')
                .map(z => z.json())
                .subscribe(nres => {
                  console.log('nres', nres);
                  this.noticeData = nres.data;
                });

            } else {
              this.alert.error('unable to find any notice ' + ' Please Reload!', 'Error');
            }
            this.school.getSchoolById(this.teacherData.schoolId)
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

