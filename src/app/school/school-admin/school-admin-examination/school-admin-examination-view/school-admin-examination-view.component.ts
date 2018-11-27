import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {ClassService} from '../../../../shared/services/class.service';
import {ExaminationService} from '../../../../shared/services/examination.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-examination-view',
  templateUrl: './school-admin-examination-view.component.html',
  styleUrls: ['./school-admin-examination-view.component.scss']
})
export class SchoolAdminExaminationViewComponent implements OnInit {
  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {
    _id: '',
  };
  examinationData: {};
  classData = [];
  toShowData = [];
  nameToDelete = '';
  sessionData = [];
  selectedSession = '';
  searchString: string;
  initialData: string;

  constructor(private school: SchoolService,
              private examination: ExaminationService,
              private session: SessionService,
              private router: Router,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.selectedSession = res.data.currentSession;
          this.session.getSessionBySchoolId(this.schoolData._id)
            .map(x => x.json())
            .subscribe(sesRes => {
              this.sessionData = sesRes.data;
            });
          this.getExam();
        } else {
          this.alert.error('School not found ' + ' Reload! ', 'Error');
        }
      })
  }

  getExam() {
    this.examination.getExamBySchoolId(this.schoolData._id, this.selectedSession)
      .map(x => x.json())
      .subscribe(res2 => {
        if (res2.data && res2.data.length) {
          console.log('res2', res2);
          this.toShowData = res2.data;
          this.initialData = JSON.stringify(res2.data);
        } else {
          this.alert.error('No Exam found!');
          this.router.navigate(['/school/admin/examination/add']);
        }
      })
  }

  delete(exam, index, content) {
    console.log('index', index);
    this.nameToDelete = exam.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.examination.deleteExam(exam._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('deleteRes', res);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success(exam.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(exam.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(exam.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(exam.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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
