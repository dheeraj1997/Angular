import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {UserService} from '../../../../shared/services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-super-school-view',
  templateUrl: './admin-super-school-view.component.html',
  styleUrls: ['./admin-super-school-view.component.scss']
})
export class AdminSuperSchoolViewComponent implements OnInit {

  nameToDelete = '';
  nameToChange = '';
  pass = '';
  repass = '';
  nameToSms = '';
  page = 1;
  start = 0;
  limit = 20;
  total = 100;
  schoolList = [];
  smsShowData = {count: 0, remaining: 0};
  searchString = '';
  initialData = '';
  statusOptions = [
    {name: 'Follow Up', value: 'fu'},
    {name: 'Demo Created', value: 'dc'},
    {name: 'Lead Closed', value: 'lc'},
    {name: 'Not Interested', value: 'ni'}
  ];

  constructor(private school: SchoolService,
              private router: Router,
              private user: UserService,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.school.getAllCount()
      .map(x => x.json())
      .subscribe(res => {
        this.total = res.data;

      });
    this.getAllSchool();
  }

  changePage(e) {
    this.start = this.limit * (e - 1);
    this.getAllSchool();
  }

  getAllSchool() {
    this.school.getAll(this.start, this.limit)
      .map(x => x.json())
      .subscribe(res => {
        this.schoolList = res.data;
        console.log('schoolList', this.schoolList);
        this.initialData = JSON.stringify(res.data);
        // this.alert.success('Total ' + this.schoolList.length + ' row(s) fetched');
      })
  }

  delete(school, index, content) {
    this.nameToDelete = school.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.school.deleteSchool(school._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('deleteRes', res);
            if (res.success) {
              this.schoolList.splice(index, 1);
              this.alert.success(school.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(school.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(school.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(school.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  changePassword(school, content) {
    this.nameToChange = school.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        if (this.pass.length && this.pass === this.repass) {
          this.user.changePassword(school.loginId, {password: this.pass})
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

  showSmsModal(school, content) {
    this.nameToSms = school.name;
    this.smsShowData.count = school.smsCount.total;
    this.smsShowData.remaining = (school.smsCount.total - school.smsCount.used);
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.school.editSchoolSms(school._id, {total: this.smsShowData.count})
          .map(x => x.json())
          .subscribe(res => {
            console.log('editSchoolSms res', res);
            if (res.success) {
              this.getAllSchool();
              this.alert.success('Sms allotted to ' + school.name + ' successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info('Sms not allotted to ' + school.name + '!', 'Information!');
      } else {
        this.alert.error('Sms not allotted to ' + school.name + '!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(`Sms not allotted to ` + school.name + ` due to ${this.getDismissReason(reason)}.`, 'Information!');
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
      this.schoolList = this.schoolList.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.schoolList.length) {
        this.schoolList = JSON.parse(this.initialData);
      }
    } else {
      this.schoolList = JSON.parse(this.initialData);
    }
  }

  changeStatus(school) {
    console.log('school', school);
    this.school.editSchoolStatus(school._id, {status: school.status})
      .map(x => x.json())
      .subscribe(res => {
        console.log('editSchoolStatus res', res);
        if (res.success) {
          this.getAllSchool();
          this.alert.success('Status of ' + school.name + ' changed successfully!', 'Success!');
        } else {
          this.alert.error('Something went wrong!', 'Error!!');
        }
      });
  }

}
