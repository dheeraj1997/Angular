import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-admin-employee-school-view',
  templateUrl: './admin-employee-school-view.component.html',
  styleUrls: ['./admin-employee-school-view.component.scss']
})
export class AdminEmployeeSchoolViewComponent implements OnInit {

  page = 1;
  start = 0;
  limit = 20;
  total = 100;
  schoolList = [];
  searchString: string;
  initialData = '';
  nameToDelete = '';
  userData = {
    _id: ''
  };
  statusOptions = [
    {name: 'Follow Up', value: 'fu'},
    {name: 'Demo Created', value: 'dc'},
    {name: 'Lead Closed', value: 'lc'},
    {name: 'Not Interested', value: 'ni'}
  ];
  statusMap = {
    fu: 'Follow Up',
    lc: 'Lead Closed',
    ni: 'Not Interested'
  };

  constructor(private school: SchoolService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getAllCount()
      .map(x => x.json())
      .subscribe(res => {
        this.total = res.data;
        // this.alert.success('Total ' + this.total + ' school found');
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
        this.alert.success('Total ' + this.schoolList.length + ' row(s) fetched');
      })
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
