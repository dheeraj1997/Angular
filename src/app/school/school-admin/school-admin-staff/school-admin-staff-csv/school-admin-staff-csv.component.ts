import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-staff-csv',
  templateUrl: './school-admin-staff-csv.component.html',
  styleUrls: ['./school-admin-staff-csv.component.scss']
})
export class SchoolAdminStaffCsvComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };

  constructor(private router: Router,
              private school: SchoolService,
              private alert: ToastrService,
              private staff: StaffService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          console.log('school', res.data);
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getCsv(type) {
    console.log('type', type);
    if (type === 'blank') {
      window.open('https://inforida.in/samplecsv/blankStaff.csv');
    } else {
      window.open('https://inforida.in/samplecsv/sampleStaff.csv');
    }
  }

  uploadCsv(event) {
    console.log('event', event);
    console.log('event.target.files', event.target.files);
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData: FormData = new FormData();
      formData.append('csv', file, file.name);
      formData.append('schoolId', this.schoolData._id.toString());
      formData.append('createdById', this.userData._id.toString());
      this.staff.addStaffCsv(formData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.alert.success(res.message, 'Success!!');
            this.router.navigate(['/school/admin/staff/view']);
          } else {
            this.alert.error(res.message);
          }
        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error!!');
        })
    } else {
      this.alert.error('No File selected', 'Error!!');
    }
  }

}
