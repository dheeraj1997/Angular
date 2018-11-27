import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {NoticeService} from '../../../../shared/services/notice.service'


const ls = localStorage;

@Component({
  selector: 'app-school-admin-notice-view',
  templateUrl: './school-admin-notice-view.component.html',
  styleUrls: ['./school-admin-notice-view.component.scss']
})
export class SchoolAdminNoticeViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  viewType = 'notice';
  toShowData = [];
  nameToDelete = '';
  titleToView = '';
  noticeInfo = '';
  searchString: string;
  initialData: string;

  constructor(private school: SchoolService,
              private router: Router,
              private notice: NoticeService,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.getNotice();
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getNotice() {
    this.notice.getNoticeBySchoolId(this.schoolData._id.toString())
      .map(y => y.json())
      .subscribe(res2 => {
        if (res2.data && res2.data.length) {
          this.viewType = 'notice';
          console.log('res2', res2);
          this.toShowData = res2.data;
          this.initialData = JSON.stringify(res2.data);
        } else {
          this.router.navigate(['/school/admin/notice/add']);
        }
      })
  }

  getDrafts() {
    this.notice.getDraftBySchoolId(this.schoolData._id.toString())
      .map(y => y.json())
      .subscribe(res2 => {
        if (res2.data && res2.data.length) {
          this.viewType = 'draft';
          console.log('res2', res2);
          this.toShowData = res2.data;
          this.initialData = JSON.stringify(res2.data);
        } else {
          this.router.navigate(['/school/admin/notice/add']);
        }
      })
  }

  view(notice, index, content) {
    this.titleToView = notice.title;
    this.noticeInfo = notice.noticeText;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'Edit') {
        this.router.navigate(['/school/admin/notice/edit', notice._id]);
      }
    })
  }


  delete(notice, index, content) {
    this.nameToDelete = notice.title;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.notice.deleteNotice(notice._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success(notice.title + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(notice.title + ' not deleted!', 'Information!');
      } else {
        this.alert.error(notice.title + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(notice.title + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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

}
