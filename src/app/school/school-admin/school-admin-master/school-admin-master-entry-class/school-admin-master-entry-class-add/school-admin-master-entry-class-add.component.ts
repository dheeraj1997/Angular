import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service';
import {ClassService} from '../../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-class-add',
  templateUrl: './school-admin-master-entry-class-add.component.html',
  styleUrls: ['./school-admin-master-entry-class-add.component.scss']
})
export class SchoolAdminMasterEntryClassAddComponent implements OnInit {
  classData = {
    name: '',
    schoolId: '',
    sessionId: '',
    comment: ''
  };
  userData = {_id: ''};
  schoolData: any;
  toShowData = [];
  nameToDelete = '';
  currentSession = '';
  searchString: string;
  initialData: string;
  isDisable = false;


  constructor(private school: SchoolService,
              private cls: ClassService,
              private router: Router,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    if (!this.userData) {
      this.alert.info('Not logged in!');
      this.router.navigate(['/']);
    }
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.currentSession = res.data.currentSession;
        this.classData.sessionId = this.currentSession;
        if (!this.currentSession) {
          this.alert.info('No current session added!');
          this.router.navigate(['/school/admin/master/session/view']);
        }
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.classData.schoolId = res.data._id.toString();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }

      })
  }

  save() {
    this.isDisable = true;
    if (!this.classData.schoolId ||
      !this.classData.name) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }

    this.cls.saveClass(this.classData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/admin/master/class/view']);
      });
  }
}

