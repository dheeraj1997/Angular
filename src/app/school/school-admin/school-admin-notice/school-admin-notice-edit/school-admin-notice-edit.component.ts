import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {NoticeService} from '../../../../shared/services/notice.service';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-notice-edit',
  templateUrl: './school-admin-notice-edit.component.html',
  styleUrls: ['./school-admin-notice-edit.component.scss']
})
export class SchoolAdminNoticeEditComponent implements OnInit {
  noticeData = {
    title: '',
    noticeDate: {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    },
    schoolId: '',
    noticeText: '',
    endDate: {},
    isHoliday: undefined,
    targetGroup: ['teachers', 'parents', 'librarians', 'accountants', 'students', 'hr', 'registrar'],
    selectRegistrar: undefined,
    selectAll: undefined,
    selectTeachers: undefined,
    selectStudents: undefined,
    selectParents: undefined,
    selectLibrarian: undefined,
    selectAccountant: undefined,
    isDraft: undefined,
  };
  schoolData = {
    _id: '',
  };
  userData = JSON.parse(ls.getItem('userData'));

  constructor(private school: SchoolService,
              private notice: NoticeService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const noticeId = params['noticeId'];
      console.log('noticeId', noticeId);
      this.notice.getNoticeById(noticeId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.noticeData = res.data;
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/notice/view'])
        })
    });

    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(scRes => {
        console.log('scRes', scRes);
        if (scRes && scRes.data && scRes.data._id) {
          this.schoolData = scRes.data;
          console.log('schoolId', this.schoolData._id);

          this.noticeData.schoolId = this.schoolData._id;
        } else {
          this.alert.error(' School data not fetched ', ' Reload !')
        }
      })
  }

  onTragetChange(noticeTarget) {
    switch (noticeTarget) {
      case 'librarians':
        if (this.noticeData.selectLibrarian) {
          if (this.noticeData.targetGroup.indexOf('librarians') === -1) {
            this.noticeData.targetGroup.push('librarians');
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('librarians'), 1)
        }
        break;

      case 'parents':
        if (this.noticeData.selectParents) {
          if (this.noticeData.targetGroup.indexOf('parents') === -1) {
            this.noticeData.targetGroup.push('parents')
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('parents'), 1)
        }
        break;
      case 'students':
        if (this.noticeData.selectStudents) {
          if (this.noticeData.targetGroup.indexOf('students') === -1) {
            this.noticeData.targetGroup.push('students')
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('students'), 1)
        }
        break;
      case 'teachers':
        if (this.noticeData.selectTeachers) {
          if (this.noticeData.targetGroup.indexOf('teachers') === -1) {
            this.noticeData.targetGroup.push('teachers')
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('teachers'), 1)
        }
        break;
      case 'registrar':
        if (this.noticeData.selectRegistrar) {
          if (this.noticeData.targetGroup.indexOf('registrar') === -1) {
            this.noticeData.targetGroup.push('registrar')
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('registrar'), 1)
        }
        break;
      case 'accountants':
        if (this.noticeData.selectAccountant) {
          if (this.noticeData.targetGroup.indexOf('accountants') === -1) {
            this.noticeData.targetGroup.push('accountants')
          }
        } else {
          this.noticeData.targetGroup.splice(this.noticeData.targetGroup.indexOf('accountants'), 1)
        }
        break;

      case 'all':
        if (this.noticeData.selectAll) {
          this.noticeData.selectTeachers = true;
          this.noticeData.selectStudents = true;
          this.noticeData.selectParents = true;
          this.noticeData.selectLibrarian = true;
          this.noticeData.selectAccountant = true;
          this.noticeData.selectRegistrar = true;
          this.noticeData.targetGroup = ['teachers', 'parents', 'librarians', 'accountants', 'students', 'registrar'];
        } else {
          this.noticeData.selectTeachers = false;
          this.noticeData.selectStudents = false;
          this.noticeData.selectParents = false;
          this.noticeData.selectLibrarian = false;
          this.noticeData.selectAccountant = false;
          this.noticeData.selectRegistrar = false;
          this.noticeData.targetGroup = [];
        }
        break;
    }
  }


  saveNotice(isDraft?) {
    this.noticeData.isDraft = !!isDraft;
    console.log('noticeData', this.noticeData);
    if (
      this.noticeData.noticeDate ||
      this.noticeData.schoolId ||
      this.noticeData.title ||
      this.noticeData.noticeText
    ) {
      this.notice.editNotice(this.noticeData)
        .map(x => x.json())
        .subscribe(res => {
          if (res.success) {
            this.alert.success(res.message, 'Success');
            this.router.navigate(['/school/admin/notice/view'])
          } else {
            this.alert.error(res.message, 'Error!');
          }

        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    } else {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
    }

  }

}


