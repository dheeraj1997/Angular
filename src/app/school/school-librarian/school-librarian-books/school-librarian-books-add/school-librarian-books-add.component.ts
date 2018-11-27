import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {StudentService} from '../../../../shared/services/student.service';
import {LibrarianService} from '../../../../shared/services/librarian.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-librarian-books-add',
  templateUrl: './school-librarian-books-add.component.html',
  styleUrls: ['./school-librarian-books-add.component.scss']
})
export class SchoolLibrarianBooksAddComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  staffData = {
    _id: ''
  };
  userData = {
    _id: '',
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
  isDisable = false;

  constructor(private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private router: Router,
              private alert: ToastrService,
              private staff: StaffService,
              private librarian: LibrarianService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('staffres', res);
        if (res && res.data && res.data._id) {
          this.staffData = res.data;
          this.bookData.createdById = res.data._id;
          if (res.data.schoolId) {
            this.bookData.schoolId = res.data.schoolId;
            console.log('bookData', this.bookData);
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
    this.isDisable = true;
    if (
      !this.bookData.schoolId ||
      !this.bookData.name ||
      !this.bookData.code
    ) {
      this.alert.error('Data Incomplete', 'Error');
      return;
    }
    this.librarian.saveBook(this.bookData)
      .map(x => x.json())
      .subscribe(res => {

        console.log('res', res);
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/school/librarian/books/view']);
        console.log('save works', this.bookData);
      });
  }

}
