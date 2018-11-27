import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {UserService} from '../../../../shared/services/user.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as _ from 'lodash';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-settings-attendance',
  templateUrl: './school-admin-settings-attendance.component.html',
  styleUrls: ['./school-admin-settings-attendance.component.scss']
})
export class SchoolAdminSettingsAttendanceComponent implements OnInit {

  userData = {_id: ''};
  schoolData = {
    _id: '',
    loginId: ''
  };
  settingsData = {
    schoolId: '',
    attendanceType: 'timetable',
    attendanceSignature: '',
    smsLanguage: 'eng'
  };
  classData = [];
  currentSession = '';
  classAttendanceSettingsData = {
    sessionId: '',
    schoolId: '',
    classData: [],
    days: [
      {name: 'monday', selected: true},
      {name: 'tuesday', selected: true},
      {name: 'wednesday', selected: true},
      {name: 'thursday', selected: true},
      {name: 'friday', selected: true},
      {name: 'saturday', selected: true},
      {name: 'sunday', selected: false}
    ]
  };

  constructor(private user: UserService,
              private alert: ToastrService,
              private cls: ClassService,
              private router: Router,
              private setting: GSettingsService,
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
            this.currentSession = res.data.currentSession;
            if (!this.currentSession) {
              this.alert.info('No current session selected!');
              this.router.navigate(['/school/admin/master/session/view']);
            } else {
              this.classAttendanceSettingsData.schoolId = res.data._id;
              this.classAttendanceSettingsData.sessionId = res.data.currentSession;
              this.settingsData.schoolId = this.schoolData._id;
              this.setting.getSettings(this.schoolData._id)
                .map(x => x.json())
                .subscribe(setRes => {
                  console.log('setRes', setRes);
                  if (setRes.success) {
                    if (setRes.data && setRes.data.admissionNo) {
                      this.settingsData = setRes.data;
                      if (!this.settingsData.smsLanguage) {
                        this.settingsData.smsLanguage = 'eng'
                      }
                    }
                  }
                });
              this.cls.getClassBySchoolId(this.schoolData._id)
                .map(x => x.json())
                .subscribe(clsRes => {
                  console.log('clsRes', clsRes);
                  const classNameMap = clsRes.data.reduce((a, p) => {
                    a[p._id] = p.name;
                    return a;
                  }, {});
                  console.log('classNameMap', classNameMap);
                  if (clsRes.success) {
                    if (clsRes.data && clsRes.data.length) {
                      const allPresentClasses = clsRes.data.map(x => x._id.toString());
                      this.setting.getClassAttendanceSettings(this.schoolData._id, this.currentSession)
                        .map(x => x.json())
                        .subscribe(csetRes => {
                          console.log('csetRes', csetRes);
                          if (csetRes.success) {
                            if (csetRes.data && csetRes.data._id) {
                              const allTimeTableClasses = csetRes.data.classData.map(x => x.classId.toString());
                              const classToShow = _.difference(allPresentClasses, allTimeTableClasses);
                              const classToDelete = _.difference(allTimeTableClasses, allPresentClasses);
                              const showClassData = csetRes.data.classData.filter(val => {
                                return classToDelete.indexOf(val.classId.toString()) === -1;
                              }).map(val => {
                                val.name = classNameMap[val.classId];
                                return val;
                              });
                              classToShow.forEach(val => {
                                showClassData.push({
                                  classId: val,
                                  name: classNameMap[val.toString()],
                                  frequency: 1
                                });
                              });
                              this.classAttendanceSettingsData = csetRes.data;
                              this.classAttendanceSettingsData.classData = showClassData;
                            } else {
                              this.classAttendanceSettingsData.classData = clsRes.data.map(cval => {
                                return {
                                  classId: cval._id,
                                  name: cval.name,
                                  frequency: 1
                                };
                              });
                            }
                          }
                        });

                    } else {
                      this.alert.info('No class present in your school. Please add a class to continue.');
                      this.router.navigate(['/school/admin/master/class/add']);
                    }
                  }
                });
            }
          } else {
            this.alert.error('Not able to fetch school information!', 'Reload Page');
          }
        })
    }
  }

  saveSettings() {
    if (
      this.settingsData.schoolId ||
      this.settingsData.attendanceType
    ) {
      console.log('settingsData', this.settingsData);
      this.setting.saveSettings(this.settingsData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('settingsData res', res);
          if (this.settingsData.attendanceType === 'timetable') {
            this.alert.success(res.message, 'Success');
            this.router.navigate(['/school/admin/timetable']);
          } else {
            console.log('classAttendanceSettingsData', JSON.stringify(this.classAttendanceSettingsData));
            this.setting.addClassAttendanceSettings(this.classAttendanceSettingsData)
              .map(y => y.json())
              .subscribe(adRes => {
                console.log('adRes', adRes);
                if (adRes.success) {
                  this.alert.success(adRes.message, 'Success');
                } else {
                  this.alert.error(adRes.message);
                }
              });
          }
        })

    } else {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
    }

  }

}
