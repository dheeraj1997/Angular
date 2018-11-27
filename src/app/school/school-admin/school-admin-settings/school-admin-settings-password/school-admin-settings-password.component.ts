import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {UserService} from '../../../../shared/services/user.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-settings-password',
  templateUrl: './school-admin-settings-password.component.html',
  styleUrls: ['./school-admin-settings-password.component.scss']
})
export class SchoolAdminSettingsPasswordComponent implements OnInit {
  pass = '';
  repass = '';
  userData = {_id: ''};
  schoolData = {
    loginId: ''
  };

  constructor(private user: UserService,
              private alert: ToastrService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    if (this.userData._id) {
      this.school.getSchoolByLoginId(this.userData._id.toString())
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res && res.data && res.data._id) {
            this.schoolData = res.data;
          } else {
            this.alert.error('Not able to fetch school information!', 'Reload Page');
          }
        })
    }
  }

  savePassword() {
    if (this.pass.length && this.pass === this.repass) {
      this.user.changePassword(this.schoolData.loginId, {password: this.pass})
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.pass = '';
            this.repass = '';
            this.alert.success(res.message, 'Success!!');
          }
        })
    } else {
      if (!this.pass.length) {
        this.alert.error('Password is empty!');
      } else {
        this.alert.error('Password do not match with confirm password!');
      }
    }
  }
}
