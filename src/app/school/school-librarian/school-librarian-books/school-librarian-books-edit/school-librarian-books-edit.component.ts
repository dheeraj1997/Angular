import {Component, OnInit} from '@angular/core';
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
  selector: 'app-school-librarian-books-edit',
  templateUrl: './school-librarian-books-edit.component.html',
  styleUrls: ['./school-librarian-books-edit.component.scss']
})
export class SchoolLibrarianBooksEditComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  toShowData = [];
  schoolData: any;
  staffData = {
    _id: ''
  };
  bookData = {
    name: '',
    schoolId: '',
    code: '',
    author: '',
    price: '',
    publishingYear: '',
    noOfBooks: '',
    createdById: '',
    classId: '',
    bookCover: ''
  };

  constructor(private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService,
              private librarian: LibrarianService,
              private staff: StaffService) {
  }

  ngOnInit() {
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
                }
                else {
                  this.alert.error('Not able to fetch school information!', 'Reload Page');
                }
              })
          }

        } else {
          this.alert.error('Not able to fetch staff information!', 'Reload Page');
        }
      })
  }

  save() {
    if (
      !this.bookData.name ||
      !this.bookData.code
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    this.librarian.editBook(this.bookData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/librarian/books/view']);
      });
  }
}


