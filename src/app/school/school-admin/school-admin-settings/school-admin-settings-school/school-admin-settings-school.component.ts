import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../../../../shared/services/school.service';
import {UserService} from '../../../../shared/services/user.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import {ToastrService} from 'ngx-toastr';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-settings-school',
  templateUrl: './school-admin-settings-school.component.html',
  styleUrls: ['./school-admin-settings-school.component.scss']
})
export class SchoolAdminSettingsSchoolComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {_id: ''};
  settingsData = {
    schoolId: '',
    admissionNo: null,
    logo: 'assets/images/blank.png'
  };

  constructor(private school: SchoolService,
              private setting: GSettingsService,
              private user: UserService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('getSchoolByLoginId res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          console.log('schoolId', this.settingsData.schoolId);
          this.setting.getSettings(this.schoolData._id)
            .map(x => x.json())
            .subscribe(setRes => {
              console.log('setRes', setRes);
              if (setRes.success) {
                if (setRes.data) {
                  const temp = setRes.data;
                  if (!setRes.data.logo) {
                    temp.logo = this.settingsData.logo;
                  }
                  if (!setRes.data.admissionNo) {
                    temp.admissionNo = this.settingsData.admissionNo;
                  }
                  this.settingsData = temp;
                }
              }
            });
          this.settingsData.schoolId = res.data._id;
          console.log('this.settingsData.schoolId', this.settingsData.schoolId);
        }

      })
  }

  uploadProfilePicture(event) {
    console.log('event', event);
    console.log('event.target.files', event.target.files);
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData: FormData = new FormData();
      formData.append('logo', file, file.name);
      console.log('formData', formData);
      this.user.uploadLogoPicture(formData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            // this.alert.success(res.message, 'Success!!');
            this.settingsData.logo = 'https://inforida.in/logo/' + res.data.name;
          } else {
            this.alert.error('Error in uploading file!', 'Error!!');
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

  clearPicture() {
    this.settingsData.logo = 'assets/images/blank.png';
  }

  saveSetting() {
    if (
      this.settingsData.schoolId ||
      this.settingsData.admissionNo
    ) {
      console.log('settingsData', this.settingsData);
      this.setting.saveSettings(this.settingsData)
        .map(x => x.json())
        .subscribe(res => {
          this.alert.success(res.message, 'Success');
          console.log('settingsData', this.settingsData);
        })

    } else {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
    }

  }
}
