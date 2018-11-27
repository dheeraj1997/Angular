import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {StudentService} from '../../../../shared/services/student.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-fees-collect',
  templateUrl: './school-accountant-fees-collect.component.html',
  styleUrls: ['./school-accountant-fees-collect.component.scss']
})
export class SchoolAccountantFeesCollectComponent implements OnInit {
  userData = {
    _id: ''
  };
  toSubmitFee = [];
  studentData = {
    _id: '',
    name: '',
    className: '',
    picture: 'https://www.nexia-sabt.co.za/wp-content/uploads/2016/05/dummy.jpg',
    motherName: '',
    motherOccupation: '',
    fatherOccupation: '',
    fatherName: '',
    schoolDetail: {
      schoolId: '',
      classId: '',
      sessionId: '',
      admissionNumber: '',
      rollNo: '',
      srnNo: '',
      admissionType: 'paid',
      admissionDate: {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
        day: (new Date()).getDate()
      }
    },
    address: {
      village: '',
      block: '',
      district: '',
      state: '',
      country: 'india',
      pin: '',
      completeAddress: ''
    },
    dob: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    },
    gender: '',
    aadhaarId: '',
    isHandicapped: false,
    nationality: 'indian',
    religion: '',
    caste: '',
    height: '',
    weight: '',
    bloodGroup: '',
    guardianInfo: {
      name: '',
      relation: 'father',
      aadhaarId: '',
      contactNo: '',
      email: ''
    },
    createdById: '',
    feesData: []
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
  staffData = {
    _id: '',
    schoolId: '',
    name: ''
  };
  studentId = '';
  sessionId = '';
  feeData = [];
  selectedSession = '';
  selectedSessionData = {
    startDate: {
      year: 2018,
      month: 1,
      day: 1
    }
  };
  showMonthData = [];
  feeCollectMonths = [];
  currentSubmittedFees = [];
  selectedClass = '';
  currentMonth = '';
  monthFeeDataMap = {};
  sessionMonthStart = '';
  totalFeeToCollect = 0;
  paymentOption = 'cash';
  isDisable = false;

  constructor(private session: SessionService,
              private school: SchoolService,
              private staff: StaffService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService,
              private student: StudentService) {
  }

  ngOnInit() {
    this.currentMonth = moment().format('MMMM').toLowerCase();
    this.userData = JSON.parse(ls.getItem('userData')) || {};
    this.selectedSession = ls.getItem('selectedSession') || '';
    this.selectedClass = ls.getItem('selectedClass') || '';
    if (this.userData._id) {
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

                this.school.getAccountantFees(this.staffData.schoolId, this.selectedSession, this.studentId)
                  .map(x => x.json())
                  .subscribe(accFeeRes => {
                    console.log('accFeeRes', accFeeRes);
                    if (accFeeRes.success && accFeeRes.data && accFeeRes.data.length) {
                      this.currentSubmittedFees = accFeeRes.data;
                      console.log('this.currentSubmittedFees', this.currentSubmittedFees);
                    }
                    this.student.getFeesById(this.studentId, this.selectedSession)
                      .map(x => x.json())
                      .subscribe(feeRes => {
                        console.log('feeRes', feeRes);
                        if (feeRes.success && feeRes.data && feeRes.data.length) {
                          if (this.selectedSession) {
                            this.session.getSessionById(this.selectedSession)
                              .map(x => x.json())
                              .subscribe(sesRes => {
                                console.log('sesRes', sesRes);
                                if (sesRes.success && sesRes.data) {
                                  this.selectedSessionData = sesRes.data;
                                  const sel = this.selectedSessionData.startDate;
                                  // console.log('feeData', this.feeData);
                                  // this.feeData = feeRes.data;
                                  this.getAllMonths(sel.year + '-' + sel.month + '-' + sel.day);
                                  const submittedFeeMonthMap =
                                    this.currentSubmittedFees.reduce((acc, pre) => {
                                      if (!acc[pre.month]) {
                                        acc[pre.month] = [];
                                      }
                                      if (pre.toCollect && !pre.isAlreadyCollected) {
                                        pre.isAlreadyCollected = true;
                                      }
                                      acc[pre.month].push(pre);
                                      return acc;
                                    }, {});
                                  console.log('submittedFeeMonthMap', submittedFeeMonthMap);
                                  this.monthFeeDataMap = feeRes.data.reduce((a, p) => {
                                    if (p.feeData) {
                                      if (p.feeData.type !== 'admission') {
                                        if (p.feeData.months && p.feeData.months.length) {
                                          p.feeData.months.forEach(monSel => {
                                            if (!a[monSel.name]) {
                                              a[monSel.name] = {
                                                feeData: [],
                                                total: 0
                                              }
                                            }
                                            if (submittedFeeMonthMap[monSel.name]) {
                                              console.log('submit fee present');
                                              console.log('submittedFeeMonthMap[monSel.name]', submittedFeeMonthMap[monSel.name]);
                                              a[monSel.name].feeData =
                                                submittedFeeMonthMap[monSel.name].map(val => {
                                                  val.toCollect = true;
                                                  return val;
                                                });
                                              console.log('a[monSel.name].feeData', a[monSel.name].feeData);
                                              a[monSel.name].total =
                                                a[monSel.name].feeData.reduce((ac, pr) => {
                                                  if (pr.toCollect && !pr.isAlreadyCollected) {
                                                    ac += pr.amount;
                                                  }
                                                  return ac;
                                                }, 0);
                                            } else {
                                              if (monSel.selected) {
                                                a[monSel.name].feeData.push({
                                                  amount: p.feeData.amount,
                                                  dueDate: p.feeData.dueDate,
                                                  particular: p.feeData.particular,
                                                  type: p.feeData.type,
                                                  schoolId: p.schoolId,
                                                  createdById: this.userData._id,
                                                  sessionId: p.sessionId,
                                                  studentId: p.studentId,
                                                  classId: p.classId,
                                                  month: monSel.name,
                                                  feesId: p._id,
                                                  toCollect: true
                                                });
                                                a[monSel.name].total += p.feeData.amount;
                                              }
                                            }
                                          });
                                        }
                                      } else {
                                        if (!a[this.sessionMonthStart]) {
                                          a[this.sessionMonthStart] = {
                                            feeData: [],
                                            total: 0
                                          }
                                        }
                                        // console.log('a[this.sessionMonthStart] 1', a[this.sessionMonthStart]);
                                        // console.log('submittedFeeMonthMap[this.sessionMonthStart]',
                                        //   submittedFeeMonthMap[this.sessionMonthStart]);
                                        if (submittedFeeMonthMap[this.sessionMonthStart]) {
                                          a[this.sessionMonthStart].feeData =
                                            submittedFeeMonthMap[this.sessionMonthStart];
                                          a[this.sessionMonthStart].total =
                                            submittedFeeMonthMap[this.sessionMonthStart].reduce((ac, pr) => {
                                              if (!pr.isAlreadyCollected) {
                                                ac += pr.amount;
                                              }
                                              return ac;
                                            }, 0);
                                        } else {
                                          a[this.sessionMonthStart].feeData.push({
                                            amount: p.feeData.amount,
                                            dueDate: p.feeData.dueDate,
                                            particular: p.feeData.particular,
                                            type: p.feeData.type,
                                            schoolId: p.schoolId,
                                            createdById: this.userData._id,
                                            sessionId: p.sessionId,
                                            studentId: p.studentId,
                                            classId: p.classId,
                                            month: this.sessionMonthStart,
                                            feesId: p._id,
                                            toCollect: true
                                          });
                                          a[this.sessionMonthStart].total += p.feeData.amount;
                                        }
                                        // console.log('a[this.sessionMonthStart] 2', a[this.sessionMonthStart]);
                                      }
                                    }
                                    return a;
                                  }, {});

                                  console.log('this.monthFeeDataMap', this.monthFeeDataMap);
                                  this.totalFeeToCollect = this.monthFeeDataMap[this.currentMonth].total;
                                  if (this.monthFeeDataMap[this.currentMonth].total > 0) {
                                    this.feeCollectMonths.push(this.currentMonth);
                                  }
                                  this.showMonthData = this.showMonthData.map(monVal => {
                                    console.log('monVal.name', monVal.name);
                                    console.log('this.monthFeeDataMap[monVal.name].total', this.monthFeeDataMap[monVal.name].total);
                                    if (this.monthFeeDataMap[monVal.name].total === 0) {
                                      monVal.isDisabled = true;
                                      monVal.selected = false;
                                    }
                                    return monVal;
                                  });
                                  // this.monthFeeDataMap = Object.keys(this.monthFeeDataMap).reduce((a, p) => {
                                  //   if (!a[p]) {
                                  //     a[p] = {}
                                  //   }
                                  //   if (!a[p].feeData) {
                                  //     a[p].feeData = [];
                                  //   }
                                  //   if (!a[p].total) {
                                  //     a[p].feeData = 0;
                                  //   }
                                  //   if (!submittedFeeMonthMap[p]) {
                                  //     a[p].feeData = this.monthFeeDataMap[p].feeData;
                                  //   } else {
                                  //     a[p].feeData = submittedFeeMonthMap[p];
                                  //     // a[p].feeData = a[p].feeData.filter(filVal => {
                                  //     //   const isPresentSubmitted = sumittedFeeMonthMap[p].find(subFeeVal => {
                                  //     //     // amount: p.feeData.amount,
                                  //     //     //   dueDate: p.feeData.dueDate,
                                  //     //     //   particular: p.feeData.particular,
                                  //     //     //   type: p.feeData.type,
                                  //     //     //   schoolId: p.schoolId,
                                  //     //     //   createdById: this.userData._id,
                                  //     //     //   sessionId: p.sessionId,
                                  //     //     //   studentId: p.studentId,
                                  //     //     //   classId: p.classId,
                                  //     //     //   month: monSel.name,
                                  //     //     //   feesId: p._id,
                                  //     //     //   toCollect: true
                                  //     //     const c1 = subFeeVal.particular === filVal.particular;
                                  //     //     const c2 = subFeeVal.amount === filVal.amount;
                                  //     //     const c3 = subFeeVal.feesId === filVal.feesId;
                                  //     //   })
                                  //     // })
                                  //   }
                                  //   return a;
                                  // }, {});
                                } else {
                                  this.alert.error('No Session data!', 'Error!');
                                }
                              })
                          }
                        } else {
                          this.alert.error('', 'No Fees data!');
                        }
                      })
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
          } else {
            this.alert.error('No Staff data!', 'Error!');
            return;
          }
        })
    } else {
      this.alert.error('No user data!', 'Error!');
      return;
    }

  }

  toggleSelectMonth(month) {
    month.selected = !month.selected;
    if (month.selected) {
      if (this.feeCollectMonths.indexOf(month.name) === -1) {
        this.feeCollectMonths.push(month.name);
        if (!this.monthFeeDataMap[month.name]) {
          this.monthFeeDataMap[month.name] = [];
        }
      }
      this.totalFeeToCollect += this.monthFeeDataMap[month.name].total;
    } else {
      this.feeCollectMonths.splice(this.feeCollectMonths.indexOf(month.name), 1);
      this.totalFeeToCollect -= this.monthFeeDataMap[month.name].total;
    }
  }

  handleCollectChange(fee, monthName) {
    if (fee.toCollect) {
      this.monthFeeDataMap[monthName].total += fee.amount;
      this.totalFeeToCollect += fee.amount;
    } else {
      this.monthFeeDataMap[monthName].total -= fee.amount;
      this.totalFeeToCollect -= fee.amount;
    }
  }

  getAllMonths(start) {
    console.log('start', start);
    const allMonths = [];
    const dateStart = moment(start, 'YYYY-MM-DD');
    this.sessionMonthStart = moment(start, 'YYYY-MM-DD').format('MMMM').toLowerCase();
    for (let i = 0; i < 12; i++) {
      allMonths.push(dateStart.format('MMMM').toLowerCase());
      dateStart.add(1, 'month');
    }
    this.showMonthData = allMonths.map(x => {
      return {
        name: x,
        selected: x === this.currentMonth,
        isDisabled: false
      };
    });
  }

  submitFees() {
    this.isDisable = true;
    console.log('this.feeCollectMonths', this.feeCollectMonths);
    console.log('this.monthFeeDataMap', this.monthFeeDataMap);
    this.toSubmitFee = this.feeCollectMonths.reduce((a, p) => {
      this.monthFeeDataMap[p].feeData = this.monthFeeDataMap[p].feeData.map(val => {
        val.paymentMode = this.paymentOption;
        return val;
      });
      a = a.concat(this.monthFeeDataMap[p].feeData);
      return a;
    }, []);
    console.log('toSubmitFee', this.toSubmitFee);
    if (this.totalFeeToCollect > 0) {
      this.printReceipt().subscribe(printRes => {
        if (printRes.filename) {
          const fileName = printRes.filename;
          console.log('fileName', fileName);
          this.toSubmitFee = this.toSubmitFee.map(vl => {
            vl.fileName = fileName;
            return vl;
          });
          this.school.saveAccountantFees(this.toSubmitFee, this.schoolData._id, this.selectedSession)
            .map(x => x.json())
            .subscribe(res => {
              this.isDisable = false;
              if (res.success) {
                this.alert.success(res.message, 'Success!!');
                ls.setItem('toSubmitFee', JSON.stringify({toSubmitFee: this.toSubmitFee}));
                this.router.navigate(['/school/accountant/fees/receipt', this.studentId, this.selectedSession]);
              }
            })
        } else {
          this.isDisable = false;
        }
      });
    } else {
      this.isDisable = false;
      this.alert.error('No fees to be collected.', 'Error!!');
    }
  }

  printReceipt() {
    const toPer = JSON.parse(JSON.stringify(this.toSubmitFee)).filter(val => {
      if (val.isAlreadyCollected) {
        return false;
      }
      return val.toCollect;
    });
    const toSend = {
      schoolName: this.schoolData.name,
      schoolAddress: this.schoolData.address.completeAddress + ','
      + this.schoolData.address.state + ', ' + this.schoolData.address.country + '-' + this.schoolData.address.pin,
      schoolPhone: this.schoolData.contact.phone[0],
      schoolEmail: this.schoolData.contact.email[0],
      studentName: this.studentData.name,
      studentClass: this.studentData.className,
      guardianName: this.studentData.guardianInfo.name,
      particular: toPer,
      total: this.totalFeeToCollect,
      payType: this.toSubmitFee[0].paymentMode,
      collectedBy: this.staffData.name
    };
    return this.school.printFeeReceipt(toSend).map(x => x.json())
  }


}
