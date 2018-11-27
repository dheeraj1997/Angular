import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-fees-receipt',
  templateUrl: './school-accountant-fees-receipt.component.html',
  styleUrls: ['./school-accountant-fees-receipt.component.scss']
})
export class SchoolAccountantFeesReceiptComponent implements OnInit {

  toSubmitFee = [];
  disablePrint = false;
  userData: any;
  today = new Date();
  staffData = {
    _id: '',
    schoolId: '',
    name: ''
  };
  studentData = {
    _id: '',
    name: '',
    className: '',
    guardianInfo: {name: ''}
  };
  schoolData: any = {
    _id: '',
    name: '',
    address: {
      block: '',
      completeAddress: '',
      country: '',
      district: '',
      pin: '',
      state: '',
      village: ''
    },
    contact: {email: [''], phone: ['']}
  };
  studentId: string;
  sessionId: string;
  totalAmount = 0;

  constructor(private session: SessionService,
              private school: SchoolService,
              private staff: StaffService,
              private cls: ClassService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService,
              private student: StudentService) {
  }

  ngOnInit() {
    const temp = JSON.parse(ls.getItem('toSubmitFee'));
    if (temp) {
      this.toSubmitFee = temp.toSubmitFee.filter(function (val) {
        if (val.isAlreadyCollected) {
          return false;
        }
        return val.toCollect;
      });
    }
    console.log('this.toSubmitFee', this.toSubmitFee);
    if (this.toSubmitFee) {
      this.totalAmount = this.toSubmitFee.reduce((ac, val) => {
        ac += val.amount;
        return ac;
      }, 0);
      this.userData = JSON.parse(ls.getItem('userData')) || {};
      this.staff.getStaffByLoginId(this.userData._id)
        .map(x => x.json())
        .subscribe(staffRes => {
          console.log('staffRes', staffRes);
          if (staffRes.success && staffRes.data) {
            this.staffData = staffRes.data;
            this.route.params.subscribe(params => {
              this.studentId = params['studentId'];
              this.sessionId = params['sessionId'];
              console.log('studentId', this.studentId);
              if (this.studentId) {
                this.student.getStudentById(this.studentId, this.sessionId)
                  .map(x => x.json())
                  .subscribe(stuRes => {
                    if (stuRes.success && stuRes.data) {
                      this.studentData = stuRes.data;
                    } else {
                      this.alert.error('No student found!', 'Error!');
                    }
                  });
              } else {
                this.alert.error('', 'No Student Id!');
              }
            });
            this.school.getSchoolById(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(schoolRes => {
                console.log('schoolRes', schoolRes);
                if (schoolRes.success && schoolRes.data) {
                  this.schoolData = schoolRes.data;
                } else {
                  this.alert.error('No School data!', 'Error!');
                }
              });
          }
        })

    } else {
      this.alert.error('No fees data for receipt!', 'Error');
      this.router.navigate(['/school/accountant/fees/add']);
    }
  }

  printReceipt() {
    // console.log('this.toSubmitFee', this.toSubmitFee);
    if (this.toSubmitFee && this.toSubmitFee[0] && this.toSubmitFee[0].fileName) {
      // window.open('https://inforida.in/feereceipt/' + this.toSubmitFee[0].fileName);
      window.open('https://inforida.in/feereceipt/' + this.toSubmitFee[0].fileName);
    } else {
      this.alert.error('No Fees Data!', 'Error!!');
    }
  }

}
