import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExaminationService} from '../../../../shared/services/examination.service';
import {SchoolService} from '../../../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-settings-examination',
  templateUrl: './school-admin-settings-examination.component.html',
  styleUrls: ['./school-admin-settings-examination.component.scss']
})
export class SchoolAdminSettingsExaminationComponent implements OnInit {
  userData: any;
  schoolData: any;
  examSetting = {
    sessionId: '',
    schoolId: '',
    resultType: 'grade',
    gradeSettings: [
      {
        minPercentage: 91,
        remark: 'Outstanding',
        gradePoint: 10.0,
        grade: 'A1'
      }, {
        minPercentage: 81,
        remark: 'Excellent',
        gradePoint: 9.0,
        grade: 'A2'
      }, {
        minPercentage: 71,
        remark: 'Very Good',
        gradePoint: 8.0,
        grade: 'B1'
      }, {
        minPercentage: 61,
        remark: 'Good',
        gradePoint: 7.0,
        grade: 'B2'
      }, {
        minPercentage: 51,
        remark: 'Above Average',
        gradePoint: 6.0,
        grade: 'C1'
      }, {
        minPercentage: 41,
        remark: 'Average',
        gradePoint: 5.0,
        grade: 'C2'
      }, {
        minPercentage: 33,
        remark: 'Pass',
        gradePoint: 4.0,
        grade: 'D'
      }, {
        minPercentage: 21,
        remark: 'Poor',
        gradePoint: 0.0,
        grade: 'E1'
      }, {
        minPercentage: 0,
        remark: 'Very Poor',
        gradePoint: 0.0,
        grade: 'E2'
      },
    ],
    divisionSettings: [
      {
        minPercentage: 75,
        remark: 'Excellent',
        division: 'Distinction'
      }, {
        minPercentage: 60,
        remark: 'Very Good',
        division: '1st Division'
      }, {
        minPercentage: 50,
        remark: 'Good',
        division: '2nd Division'
      }, {
        minPercentage: 40,
        remark: 'Satisfactory',
        division: '3rd Division'
      }, {
        minPercentage: 33,
        remark: 'Just Pass',
        division: '4th Division'
      }
    ],
    createdById: '',
  };
  gradeRow = {
    minPercentage: 0,
    remark: '',
    gradePoint: 0.0,
    grade: ''
  };
  divisionRow = {
    minPercentage: 75,
    remark: 'Excellent',
    division: 'Distinction'
  };

  constructor(private alert: ToastrService,
              private router: Router,
              private exam: ExaminationService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(res => {
        this.schoolData = res.data;
        this.examSetting.schoolId = this.schoolData._id;
        this.examSetting.sessionId = this.schoolData.currentSession;
        this.getExamSettings();
      })
  }

  addGradeRow() {
    this.examSetting.gradeSettings.push(JSON.parse(JSON.stringify(this.gradeRow)));
  }

  addDivisionRow() {
    this.examSetting.divisionSettings.push(JSON.parse(JSON.stringify(this.divisionRow)));
  }

  deleteGradeRow(ind) {
    this.examSetting.gradeSettings.splice(ind, 1);
  }

  deleteDivisionRow(ind) {
    this.examSetting.divisionSettings.splice(ind, 1);
  }

  getExamSettings() {
    this.exam.getExamSettingsBySchoolId(this.schoolData._id, this.schoolData.currentSession)
      .map(x => x.json())
      .subscribe(res => {
        if (res.success && res.data && res.data._id) {
          console.log('set res', res);
          this.examSetting = res.data;
        }
      })
  }

  saveExamSettings() {
    this.exam.saveExamSettings(this.examSetting)
      .map(x => x.json())
      .subscribe(res => {
        console.log('set res', res);
        if (res.success) {
          this.getExamSettings();
          this.alert.success(res.message, 'Success!!');
        }
      })
  }

}
