import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../../shared/services/school.service';
import {SubjectService} from '../../../../../shared/services/subject.service';

const ls = localStorage;


@Component({
  selector: 'app-school-admin-master-entry-subject-view',
  templateUrl: './school-admin-master-entry-subject-view.component.html',
  styleUrls: ['./school-admin-master-entry-subject-view.component.scss']
})
export class SchoolAdminMasterEntrySubjectViewComponent implements OnInit {
  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  toShowData = [];
  nameToDelete = '';
  searchString: string;
  initialData: string;
  isDisable = false;

  constructor(private school: SchoolService,
              private subject: SubjectService,
              private router: Router,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.userData = JSON.parse(ls.getItem('userData'));
    if (!this.userData) {
      this.alert.error('Not logged in!', 'Reload Page');
      this.router.navigate(['/']);
    }
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.subject.getSubjectBySchoolId(this.schoolData._id.toString())
            .map(y => y.json())
            .subscribe(res2 => {
              if (res2.data && res2.data.length) {
                this.toShowData = res2.data;
                this.initialData = JSON.stringify(res2.data);
              } else {
                this.alert.info('No subject to display. Add a subject to continue!');
                this.router.navigate(['/school/admin/master/subject/add']);
              }
            })
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }


  delete(subjHere, index, content) {
    this.nameToDelete = subjHere.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.subject.deleteSubject(subjHere._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success(subjHere.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(subjHere.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(subjHere.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(subjHere.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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

