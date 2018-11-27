import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service';
import {SubjectService} from '../../../../../shared/services/subject.service';

const ls = localStorage;


@Component({
  selector: 'app-school-admin-master-entry-subject-add',
  templateUrl: './school-admin-master-entry-subject-add.component.html',
  styleUrls: ['./school-admin-master-entry-subject-add.component.scss']
})
export class SchoolAdminMasterEntrySubjectAddComponent implements OnInit {
  subjectData = {
    name: '',
    schoolId: '',
    comment: ''
  };
  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  toShowData = [];
  nameToDelete = '';
  searchString: string;
  initialData: string;
  isDisable = false;

  constructor(private school: SchoolService,
              private subject: SubjectService,
              private router: Router,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    if (!this.userData) {
      this.alert.error('Not logged in!', 'Reload Page');
      this.router.navigate(['/']);
    }
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.subjectData.schoolId = res.data._id.toString();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  save() {
    this.isDisable = true;
    if (
      !this.subjectData.schoolId ||
      !this.subjectData.name
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    this.subject.saveSubject(this.subjectData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/admin/master/subject/view']);
      });
  }
}
