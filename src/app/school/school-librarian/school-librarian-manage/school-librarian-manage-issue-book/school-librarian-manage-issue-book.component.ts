import {Component, OnInit} from '@angular/core';
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
  selector: 'app-school-librarian-manage-issue-book',
  templateUrl: './school-librarian-manage-issue-book.component.html',
  styleUrls: ['./school-librarian-manage-issue-book.component.scss']
})
export class SchoolLibrarianManageIssueBookComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  toShowData = [];
  searchString: string;
  initialData: string;
  schoolData: any;
  nameToDelete: any;
  staffData = {
    _id: ''
  };

  constructor(private school: SchoolService,
    private student: StudentService,
    private cls: ClassService,
    private modalService: NgbModal,
    private router: Router,
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
          this.librarian.getBooksBySchoolId(res.data.schoolId)
          .map(x => x.json())
          .subscribe(bookRes => {
            console.log('bookRes', bookRes);
            if (bookRes.success) {
              this.toShowData = bookRes.data;
              this.initialData = JSON.stringify(bookRes.data);
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

}
