import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service';
import {ClassService} from '../../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-class-edit',
  templateUrl: './school-admin-master-entry-class-edit.component.html',
  styleUrls: ['./school-admin-master-entry-class-edit.component.scss']
})
export class SchoolAdminMasterEntryClassEditComponent implements OnInit {
classData = {
    name: '',
    schoolId: ''
  };
  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {};

  constructor(private school: SchoolService,
              private cls: ClassService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const classId = params['classId'];
      console.log('classId', classId);
      this.cls.getClassById(classId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.classData = res.data;
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/class/view'])
        })
    });
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.classData.schoolId = res.data._id.toString();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  save() {
    if (
      !this.classData.schoolId ||
      !this.classData.name
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    this.cls.editClass(this.classData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/admin/master/class/view']);
      });
  }

}
