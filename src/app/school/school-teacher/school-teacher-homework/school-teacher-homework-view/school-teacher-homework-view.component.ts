import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SubjectService} from '../../../../shared/services/subject.service'
import {TeacherService} from '../../../../shared/services/teacher.service';
import {HomeworkService} from '../../../../shared/services/homework.service';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-homework-view',
  templateUrl: './school-teacher-homework-view.component.html',
  styleUrls: ['./school-teacher-homework-view.component.scss']
})
export class SchoolTeacherHomeworkViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  teacherData = {
    _id: '',
    schoolId: '',
  }
  schoolData = {};
  toShowData = [];
  nameToDelete = '';
  searchString: string;
  initialData: string;
  modelDate: '';
  modelSubject: '';
  modelHomework: '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private school: SchoolService,
              private modalService: NgbModal,
              private subject: SubjectService,
              private teacher: TeacherService,
              private cls: ClassService,
              private homework: HomeworkService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.teacher.getTeacherByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(tres => {
        console.log('tres', tres);
        if (tres && tres.data && tres.data._id) {
          this.teacherData = tres.data;
          this.teacherData._id = tres.data._id;
          this.homework.getHomeworkBySchoolTeacher(this.teacherData.schoolId, tres.data._id)
            .map(x => x.json())
            .subscribe(hwres => {
              if (hwres.data && hwres.data.length) {
                this.toShowData = hwres.data;
                this.initialData = JSON.stringify(hwres.data);
                console.log('toShowData', this.toShowData);
              }

              else {
                this.alert.error('Homework not Found !', 'Error')
              }
            })
        }

      })

  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.subjectName);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

  view(homework, index, content) {
    this.modelDate = homework.createdAt;
    this.modelSubject = homework.subjectName;
    this.modelHomework = homework.homeworkText;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'edit') {
        this.router.navigate(['/school/teacher/homework/edit', homework._id]);

      }
    })

  }

  delete(homework, index, content) {
    this.modelSubject = homework.subjectName;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        console.log('homeworkId', homework._id);
        this.homework.deleteHomework(homework._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            console.log('homeworkId', homework._id);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success('homework' + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info('homework' + ' not deleted!', 'Information!');
      } else {
        this.alert.error('homework' + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info('homework' + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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
