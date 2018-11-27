import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../../shared/services/school.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import {ToastrService} from 'ngx-toastr';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-settings-student',
  templateUrl: './school-admin-settings-student.component.html',
  styleUrls: ['./school-admin-settings-student.component.scss']
})
export class SchoolAdminSettingsStudentComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {_id: ''};
  settingsData = {
    schoolId: '',
    admissionNo: null,
    attendanceType: 'timetable'
  };

  constructor(private school: SchoolService,
              private setting: GSettingsService,
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
                if (setRes.data && setRes.data.attendanceType) {
                  this.settingsData = setRes.data;
                }
              }
            });
          this.settingsData.schoolId = res.data._id;
          console.log('this.settingsData.schoolId', this.settingsData.schoolId);
        }

      })
  }

  SettingSave() {
    if (
      this.settingsData.schoolId ||
      this.settingsData.admissionNo
    ) {
      this.setting.saveSettings(this.settingsData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('settingsData', this.settingsData);
          this.alert.success(res.message, 'Success');
          console.log('settingsData', this.settingsData);
        })

    } else {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
    }

  }
}
