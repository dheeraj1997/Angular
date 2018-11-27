import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {UserService} from '../../../../shared/services/user.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-staff-view',
  templateUrl: './school-admin-staff-view.component.html',
  styleUrls: ['./school-admin-staff-view.component.scss']
})
export class SchoolAdminStaffViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  classData = [];
  toShowData = [];
  nameToDelete = '';
  nameToChange = '';
  pass = '';
  repass = '';
  searchString: string;
  initialData: string;

  constructor(private school: SchoolService,
              private staff: StaffService,
              private router: Router,
              private user: UserService,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.getStaffs();
        } else {
          this.alert.error('Not able to fetch staff\'s information!', 'Reload Page');
        }
      })
  }

  getStaffs() {
    this.staff.getStaffBySchoolId(this.schoolData._id)
      .map(y => y.json())
      .subscribe(res2 => {
        console.log('res2', res2);
        if (res2.data && res2.data.length) {
          this.toShowData = res2.data;
          this.initialData = JSON.stringify(res2.data.sort(function (a, b) {
            return a.rollNo - b.rollNo;
          }));
        } else {
          this.toShowData = [];
          this.alert.error('No staff information!', 'Error');
        }
      })
  }

  delete(staff, index, content) {
    this.nameToDelete = staff.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.staff.deleteStaff(staff._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success(staff.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(staff.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(staff.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(staff.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  changePassword(staff, content) {
    this.nameToChange = staff.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        if (this.pass.length && this.pass === this.repass) {
          this.user.changePassword(staff.loginId, {password: this.pass})
            .map(x => x.json())
            .subscribe(res => {
              console.log('res', res);
              if (res.success) {
                this.pass = '';
                this.repass = '';
                this.alert.success(res.message, 'Success!!');
              }
            })
        } else {
          if (!this.pass.length) {
            this.alert.error('Password is empty!');
          } else {
            this.alert.error('Password do not match with confirm password!');
          }
        }
      } else {
        this.alert.info('password not changed!', 'Info!');
      }
    }, (reason) => {
      this.alert.info(`password not changed due to ${this.getDismissReason(reason)}`, 'Info!');
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
