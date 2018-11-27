import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-transport-view',
  templateUrl: './school-accountant-transport-view.component.html',
  styleUrls: ['./school-accountant-transport-view.component.scss']
})
export class SchoolAccountantTransportViewComponent implements OnInit {
  selectedSession = '';
  selectedClass = '';
  userData = {
    _id: ''
  };
  schoolData = {
    _id: ''
  };
  classData = [];
  sessionData = [];
  toShowData = [];
  transportData = {
    discontinueDate: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    },
    doj: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    },
    amount: '',
    route: '',
    vehicleNo: '',
  };
  nameOfStudent = '';
  searchString: string;
  initialData: string;
  isTransportFee = false;

  constructor(private session: SessionService,
              private school: SchoolService,
              private staff: StaffService,
              private cls: ClassService,
              private modalService: NgbModal,
              private alert: ToastrService,
              private student: StudentService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedSession = ls.getItem('selectedSession');
    this.selectedClass = ls.getItem('selectedClass');
    if (this.userData._id) {
      this.staff.getStaffByLoginId(this.userData._id)
        .map(x => x.json())
        .subscribe(staffRes => {
          console.log('staffRes', staffRes);
          if (staffRes.success && staffRes.data) {
            this.cls.getClassBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(clsRes => {
                console.log('clsRes', clsRes);
                if (clsRes.success && clsRes.data && clsRes.data.length) {
                  this.classData = clsRes.data;
                }
              });

            this.session.getSessionBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(sessRes => {
                console.log('sessRes', sessRes);
                if (sessRes.success && sessRes.data && sessRes.data.length) {
                  this.sessionData = sessRes.data;
                }
              });

            this.school.getSchoolById(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(schoolRes => {
                console.log('schoolRes', schoolRes);
                if (schoolRes.success && schoolRes.data) {
                  this.schoolData = schoolRes.data;
                  this.getStudents();
                }
              });

          }
        })
    }
  }

  getStudents() {
    if (this.schoolData._id && this.selectedClass && this.selectedSession) {
      this.student
        .getStudentBySchoolAndClassAndSessionByTransportFees(this.schoolData._id, this.selectedClass, this.selectedSession)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getStudentBySchoolAndClassAndSession res', res);
          if (res.success && res.data && res.data.length) {
            // this.alert.success(res.message);
            const temp = res.data.sort((a, b) => {
              if (a.schoolDetail.rollNo && b.schoolDetail.rollNo) {
                return parseInt(a.schoolDetail.rollNo, 10) - parseInt(b.schoolDetail.rollNo, 10);
              } else {
                return parseInt(a.schoolDetail.admissionNumber, 10) - parseInt(b.schoolDetail.admissionNumber, 10);
              }
            });
            this.toShowData = temp;
            this.initialData = JSON.stringify(temp);
          } else {
            this.toShowData = [];
            this.initialData = JSON.stringify([]);
          }
        })
    }
  }

  onSessionChange() {
    ls.setItem('selectedSession', this.selectedSession);
    this.getStudents()
  }

  onClassChange() {
    ls.setItem('selectedClass', this.selectedClass);
    this.getStudents()
  }

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

  discontinueTransport(student, index, content1) {
    console.log('discontinue', this.transportData);
    this.nameOfStudent = student.name;
    this.modalService.open(content1)
      .result.then((result) => {
      if (result === 'yes') {
        this.discontinueTransportStudent(student)
      } else if (result === 'cancel') {
        this.alert.info('Transport of' + student.name + ' not discontinued !', 'Information!');
      } else {
        this.alert.error('Transport of' + student.name + ' not discontinued !', 'Error!');
      }
    }, (reason) => {
      this.alert.info('Transport of' + student.name + ` not discontinued  due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'clicking on a background!';
    } else {
      return `${reason}`;
    }
  }

  discontinueTransportStudent(student) {
    if (this.transportData.discontinueDate) {
      this.student.discontinueStudentTransport(student._id, this.transportData.discontinueDate)
        .map(x => x.json())
        .subscribe(res => {
          console.log('transportDiscontinueRes', res);
          if (res.success) {
            this.getStudents();
            this.alert.success('Transport fee Of ' + student.name + ' discontinued successfully!', 'Success!');
          } else {
            this.alert.error('Something went wrong!', 'Error!!');
          }
        });
    } else {
      this.alert.error('Something went wrong!' + 'Check Your Form!', 'Error!!');
    }
  }
}


