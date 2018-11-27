import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {SchoolService} from '../../../../../shared/services/school.service'
import {SessionService} from '../../../../../shared/services/session.service'

const ls = localStorage;

@Component({
  selector: 'app-school-admin-master-entry-session-view',
  templateUrl: './school-admin-master-entry-session-view.component.html',
  styleUrls: ['./school-admin-master-entry-session-view.component.scss']
})
export class SchoolAdminMasterEntrySessionViewComponent implements OnInit {

  sessionData = {
    name: '',
    startDate: {},
    endDate: {},
    schoolId: ''
  };
  currentSession = '';
  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  toShowData = [];
  nameToDelete = '';
  searchString: string;
  initialData: string;
  isDisable = false;

  constructor(private school: SchoolService,
              private session: SessionService,
              private router: Router,
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
          if (this.schoolData.currentSession) {
            this.currentSession = this.schoolData.currentSession;
          }
          this.sessionData.schoolId = res.data._id.toString();
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(y => y.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.toShowData = res2.data.map(sesVal => {
                  sesVal.startDate = sesVal.startDate.year + '-' + sesVal.startDate.month + '-' + sesVal.startDate.day;
                  sesVal.startDate = moment(sesVal.startDate, 'YYYY-MM-DD');
                  sesVal.endDate = sesVal.endDate.year + '-' + sesVal.endDate.month + '-' + sesVal.endDate.day;
                  sesVal.endDate = moment(sesVal.endDate, 'YYYY-MM-DD');
                  return sesVal;
                });
                this.initialData = JSON.stringify(res2.data);
              } else {
                this.router.navigate(['/school/admin/master/session/add']);
              }
            })
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  onChangeCurrentSession() {
    console.log('currentSession', this.currentSession);
    this.school.setCurrentSession(this.schoolData._id, this.currentSession)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success!!');
        }
      })
  }

  delete(session, index, content) {
    this.nameToDelete = session.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.session.deleteSession(session._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success(session.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(session.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(session.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(session.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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


