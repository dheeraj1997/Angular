import {Component, OnInit} from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
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
  selector: 'app-school-librarian-manage-return',
  templateUrl: './school-librarian-manage-return.component.html',
  styleUrls: ['./school-librarian-manage-return.component.scss']
})
export class SchoolLibrarianManageReturnComponent implements OnInit {

  userData = {
    _id: ''
  };
  toShowData = [];
  searchString: string;
  initialData: string;
  staffData = [];
  schoolData = {};
  classData = [];
  studentData = [];
  bookData = [];
  issueData = {
    _id: '',
    returnComment: '',
    isReturned: false,
    returnDate: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date).getDate()
    }
  };
  nameWhoReturn: '';
  returnBookName: '';


  constructor(private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private modalService: NgbModal,
              private router: Router,
              private config: NgbDatepickerConfig,
              private alert: ToastrService,
              private librarian: LibrarianService,
              private staff: StaffService) {
  }

  ngOnInit() {
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
                  console.log('schoolRes', scRes);
                  if (scRes.data) {
                    this.schoolData = scRes.data;
                  } else {
                    this.alert.error('Not able to fetch school information!', 'Reload Page');
                  }

                  this.librarian.getIssueBooksBySchoolId(res.data.schoolId)
                    .map(x => x.json())
                    .subscribe(issueBookRes => {
                      console.log('issueBookRes', issueBookRes.data);
                      if (issueBookRes.success) {
                        this.toShowData = issueBookRes.data;
                        this.initialData = JSON.stringify(issueBookRes.data);
                      } else {
                        this.alert.error('Not able to fetch Book information!', 'Reload Page');
                      }
                    })

                }
              )
          }
        } else {
          this.alert.error('Staff not fetched', 'Reload Page !');
        }

      })
  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.studentName);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

  openReturnModel(issueBook, index, content) {
    this.nameWhoReturn = issueBook.studentName;
    this.returnBookName = issueBook.bookName;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.returnBook(issueBook);
      } else if (result === 'cancel') {
        this.alert.info(this.returnBookName + ' not returned from ' + this.nameWhoReturn + ' Information!');
      } else {
        this.alert.error(this.returnBookName + ' not returned!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(this.returnBookName + ` not returned by ` +
        this.nameWhoReturn + ` due to ${this.getDismissReason(reason)}`, 'Information!');
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

  returnBook(issueBook) {
    this.issueData._id = issueBook._id;

    if (!this.issueData.returnDate) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    } else {
      this.issueData.isReturned = true;
      console.log('issueData after return', this.issueData);
      this.librarian.returnBook(this.issueData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/school/librarian/manage/issueBook']);
        });
    }
  }
}
