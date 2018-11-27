import {Component, OnInit} from '@angular/core';

const ls = localStorage;

@Component({
  selector: 'app-school-hr-management-attendance-view',
  templateUrl: './school-hr-management-attendance-view.component.html',
  styleUrls: ['./school-hr-management-attendance-view.component.scss']
})
export class SchoolHrManagementAttendanceViewComponent implements OnInit {
  selectedMonth: '';
  months = ['january', 'feb', 'mar', 'april', 'may', 'april'];
  searchString = '';

  constructor() {
  }

  ngOnInit() {
  }

  searchStaff(e) {
    console.log(e);
  }

}
