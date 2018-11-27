import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SubjectService} from '../../../../shared/services/subject.service'
import {TeacherService} from '../../../../shared/services/teacher.service';
import {HomeworkService} from '../../../../shared/services/homework.service';


const ls = localStorage;

@Component({
  selector: 'app-school-teacher-homework-add',
  templateUrl: './school-teacher-homework-add.component.html',
  styleUrls: ['./school-teacher-homework-add.component.scss']
})
export class SchoolTeacherHomeworkAddComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {
    _id: ''
  };
  teacherData = {
    _id: '',
    schoolId: '',
  };
  classData = [];
  subjectData = [];
  homeworkData = {
    homeworkText :'',
    classId :'',
    subjectId :'',
    schoolId : '',
    teacherId : '',
  };
  selectedClass: string;
  selectedSubject: string;
  isDisable = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private school: SchoolService,
    private subject: SubjectService,
    private teacher: TeacherService,
    private cls: ClassService,
    private homework : HomeworkService,
    private alert: ToastrService) {}

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.teacher.getTeacherByLoginId(this.userData._id.toString())
    .map(x=>x.json())
    .subscribe(tres=>{
      console.log('tres',tres);
      if (tres && tres.data && tres.data._id) {
        this.teacherData = tres.data;
        this.homeworkData.teacherId = tres.data._id ;
        this.cls.getClassBySchoolId(this.teacherData.schoolId)
        .map(x=>x.json())
        .subscribe(cres=>{
          if (cres && cres.data) {
            this.classData = cres.data ;
          } else{
            this.alert.error('Class not found');
          }
        })
        this.subject.getSubjectBySchoolId(this.teacherData.schoolId)
        .map(x=>x.json())
        .subscribe(sures=>{
          console.log('sures',sures);
          if(sures && sures.data){
            this.subjectData = sures.data ;
          } else {
            this.alert.error('Subject not Fetched');
          }
        })
      } else{
        this.alert.error('Not able to get Teacher Information')
      }
    })
  }

  saveHomework(){
    this.homeworkData.classId = this.selectedClass;
    this.homeworkData.subjectId  = this.selectedSubject;
    this.homeworkData.schoolId = this.teacherData.schoolId ;
    this.homeworkData.teacherId = this.teacherData._id ;

    if(!this.homeworkData.classId ||
      !this.homeworkData.subjectId ||
      !this.homeworkData.schoolId ||
      !this.homeworkData.teacherId ||
      !this.homeworkData.homeworkText){
      this.alert.error('Data not Provided' ,'Error');
  }
  else{
    console.log('Data' , this.homeworkData);
    this.homework.submitHomework(this.homeworkData)
    .map(x=>x.json())
    .subscribe(res4=>{
      this.alert.success(res4.message, 'Success');
      this.router.navigate(['/school/teacher/homework/view']) ;
      err => {
        err = err.json();
        console.log('err', err);
        this.alert.error(err.error, 'Error');
        console.log('homeworkData',this.homeworkData);
      }
    })
  }
}
}


