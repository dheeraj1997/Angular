import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SessionService} from '../../../../shared/services/session.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-registrar-student-view',
  templateUrl: './school-registrar-student-view.component.html',
  styleUrls: ['./school-registrar-student-view.component.scss']
})
export class SchoolRegistrarStudentViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  classData = [];
  studentData = [];
  sessionData = [];
  toShowData = [];
  staffData = {
    _id: '',
    schoolId: ''
  };
  selectedClass = '';
  selectedSession = '';
  nameToDelete = '';
  searchString: string;
  initialData: string;
  rollNumberType = '';
  rollNumberOptions = [{name: 'Admission Number', value: 'created'}, {name: 'Alphabetical Order', value: 'alpha'}];

  constructor(private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private session: SessionService,
              private router: Router,
              private staff: StaffService,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.selectedClass = ls.getItem('selectedClass') || '';
    this.selectedSession = ls.getItem('selectedSession') || '';
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('staffres', res);
        if (res && res.data && res.data._id) {
          this.staffData = res.data;
          this.getDetails();
        } else {
          this.alert.error('Not able to fetch staff information!', 'Reload Page');
        }
      })

  }

  getDetails() {
    this.school.getSchoolById(this.staffData.schoolId)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.getStudents();
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.sessionData = res2.data;
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
        } else {
          this.alert.error('Not able to fetch student\'s information!', 'Reload Page');
        }
      })
  }


  getStudents() {
    if (this.selectedClass && this.selectedSession && this.schoolData._id) {
      const classId = this.selectedClass;
      const sessionId = this.selectedSession;
      ls.setItem('selectedClass', classId);
      ls.setItem('selectedSession', sessionId);
      console.log('classId', classId);
      console.log('classId', classId);
      console.log('schoolData._id', this.schoolData._id);
      this.student
        .getStudentBySchoolAndClassAndSession(this.schoolData._id, classId, sessionId)
        .map(y => y.json())
        .subscribe(res2 => {
          console.log('res2', res2);
          if (res2.data && res2.data.length) {
            this.toShowData = res2.data.sort((a, b) => {
              if (a.schoolDetail.rollNo && b.schoolDetail.rollNo) {
                return parseInt(a.schoolDetail.rollNo, 10) - parseInt(b.schoolDetail.rollNo, 10);
              } else {
                return parseInt(a.schoolDetail.admissionNumber, 10) - parseInt(b.schoolDetail.admissionNumber, 10);
              }
            });
            this.initialData = JSON.stringify(this.toShowData);
          } else {
            this.toShowData = [];
            this.alert.error('No student information!', 'Error');
          }
        })
    }
  }

  // delete(student, index, content) {
  //   this.nameToDelete = student.name;
  //   this.modalService.open(content)
  //     .result.then((result) => {
  //     if (result === 'yes') {
  //       this.student.deleteStudent(student._id)
  //         .map(x => x.json())
  //         .subscribe(res => {
  //           console.log('res', res);
  //           if (res.success) {
  //             this.toShowData.splice(index, 1);
  //             this.alert.success(student.name + ' deleted successfully!', 'Success!');
  //           } else {
  //             this.alert.error('Something went wrong!', 'Error!!');
  //           }
  //         });
  //     } else if (result === 'cancel') {
  //       this.alert.info(student.name + ' not deleted!', 'Information!');
  //     } else {
  //       this.alert.error(student.name + ' not deleted!', 'Error!');
  //     }
  //   }, (reason) => {
  //     this.alert.info(student.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'clicking on a background!';
  //   } else {
  //     return `${reason}`;
  //   }
  // }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

  assignRollNumbers() {
    console.log('rollNumberType', this.rollNumberType);
    if (!this.rollNumberType) {
      this.alert.error('Roll Number assignment type not selected!', 'Error');
      return;
    } else {
      const toSendData = {
        rollNumberType: this.rollNumberType,
        idRollNoArr: []
      };
      if (!this.initialData.length) {
        this.alert.error('No Student Find!', 'Error');
        return;
      } else {
        let initData = JSON.parse(this.initialData);
        console.log('initData', initData);
        if (this.rollNumberType === 'alpha') {
          initData = initData.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        } else {
          initData = initData.sort((a, b) => {
            return parseInt(a.schoolDetail.admissionNumber, 10) - parseInt(b.schoolDetail.admissionNumber, 10);
          })
        }
        toSendData.idRollNoArr = initData.map((val, ind) => {
          return {studentId: val._id, rollNo: ind + 1};
        });
      }
      console.log('toSendData', toSendData);
      this.student.assignRollNumbers(toSendData)
        .map(x => x.json())
        .subscribe(rRes => {
          console.log('rRes', rRes);
          if (rRes.success) {
            this.alert.success(rRes.message, 'Success!');
            this.getStudents();
          }
        })


    }
  }

}
