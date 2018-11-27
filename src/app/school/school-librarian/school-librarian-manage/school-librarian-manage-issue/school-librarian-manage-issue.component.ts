import {Component, OnInit} from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgClass} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {StudentService} from '../../../../shared/services/student.service';
import {LibrarianService} from '../../../../shared/services/librarian.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-librarian-manage-issue',
  templateUrl: './school-librarian-manage-issue.component.html',
  styleUrls: ['./school-librarian-manage-issue.component.scss']
})
export class SchoolLibrarianManageIssueComponent implements OnInit {

  userData = {
    _id: ''
  }

  schoolData: any;
  studentData = [];
  classData = [];
  bookData: any;
  initialStudentData: string;
  searchString: string;
  nameToIssue: '';

  issueData = {
    issueDate: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date).getDate()
    },
    expectedReturnDate: {},
    studentId: '',
    schoolId: '',
    classId: '',
    studentClass: '',
    bookId: '',
    bookName: '',
    bookCode: '',

    studentName: '',
    issueComment: '',
  };
  staffData: any;
  selectedSession = '';
  selectedClass = '';
  selectedStudent = '';
  isDisable = false;

  constructor(private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService,
              private config: NgbDatepickerConfig,
              private librarian: LibrarianService,
              private staff: StaffService) {
    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    // config.markDisabled = (date: NgbDateStruct) => {
    // 	const d = new Date(date.year, date.month - 1, date.day);
    // 	return d.getDay() === 0;
    // };
  }

  ngOnInit() {
    let someDate = new Date();
    someDate.setDate(someDate.getDate() + 15)
    this.issueData.expectedReturnDate = {
      year: (someDate).getFullYear(),
      month: (someDate).getMonth() + 1,
      day: (someDate).getDate()
    };
    this.route.params.subscribe(params => {
      const bookId = params['bookId'];
      console.log('bookId', bookId);
      this.librarian.getBookById(bookId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getByBookIdres', res);
          if (res.success) {
            this.bookData = res.data;
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          console.log('err', err);
          this.router.navigate(['/school/librarian/books/view'])
        })
    });

    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('staffres', res);
        if (res && res.data && res.data._id) {
          this.staffData = res.data;
          if (res.data.schoolId) {
            this.school.getSchoolById(res.data.schoolId)
              .map(x => x.json())
              .subscribe(scRes => {
                console.log('scRes', scRes);
                if (scRes.success) {
                  this.schoolData = scRes.data;

                  this.selectedSession = this.schoolData.currentSession;
                  if (!this.selectedSession) {
                    this.alert.error('No current session selected by school admin')
                  }
                } else {
                  this.alert.error('Not able to fetch school information!', 'Reload Page');
                }
                this.cls.getClassBySchoolId(res.data.schoolId)
                  .map(y => y.json())
                  .subscribe(clres => {
                    console.log('clRes', clres);
                    this.classData = clres.data;
                    if (!this.classData || !this.classData.length) {
                      this.alert.error('Classes not Fetched');
                    }

                  })
              })
          }

        }
        else {
          this.alert.error('Not able to fetch staff information!', 'Reload Page');
        }

      });
  }

  getStudents() {
    if (this.selectedClass && this.selectedSession && this.schoolData._id) {
      const classId = this.selectedClass;
      const sessionId = this.selectedSession;
      ls.setItem('selectedClass', classId);
      ls.setItem('selectedSession', sessionId);
      console.log('classId', classId);
      console.log('schoolData._id', this.schoolData._id);
      this.student
        .getStudentBySchoolAndClassAndSession(this.schoolData._id, classId, sessionId)
        .map(y => y.json())
        .subscribe(studentRes => {
          console.log('studentRes', studentRes);
          this.studentData = studentRes.data.map(function (val) {
            val.isPresent = true;
            return val;
          }).sort((a, b) => {
            if (a.schoolDetail.rollNo && b.schoolDetail.rollNo) {
              return parseInt(a.schoolDetail.rollNo, 10) - parseInt(b.schoolDetail.rollNo, 10);
            } else {
              return parseInt(a.schoolDetail.admissionNumber, 10) - parseInt(b.schoolDetail.admissionNumber, 10);
            }
          });
        });
    } else {
      this.alert.error('No student found!', 'Error');
    }
  }

  openIssueModel(student, index, content) {
    this.nameToIssue = student.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.issueBook(student);
      } else if (result === 'cancel') {
        this.alert.info(this.bookData.name + ' not issued to ' + student.name, 'Information!');
      } else {
        this.alert.error(this.bookData.name + ' not issued!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(this.bookData.name + ` not issued to ` + student.name + ` due to ${this.getDismissReason(reason)}`, 'Information!');
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


  issueBook(student) {
    this.isDisable = true;
    this.issueData.schoolId = this.schoolData._id;
    this.issueData.studentId = student._id;
    this.issueData.studentName = student.name;
    this.issueData.bookId = this.bookData._id;
    this.issueData.classId = this.selectedClass
    this.issueData.bookName = this.bookData.name;
    this.issueData.bookCode = this.bookData.code;
    this.issueData.studentClass = this.selectedClass;

    if (
      !this.issueData.issueDate ||
      !this.issueData.expectedReturnDate ||
      !this.issueData.bookId ||
      !this.issueData.studentId ||
      !this.issueData.schoolId ||
      !this.issueData.bookCode ||
      !this.issueData.bookName ||
      !this.issueData.studentName


    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    console.log('this.issueData', this.issueData);
    this.librarian.issueBook(this.issueData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/librarian/manage/return']);
      });
    console.log('issueData', this.issueData);
  }
}

