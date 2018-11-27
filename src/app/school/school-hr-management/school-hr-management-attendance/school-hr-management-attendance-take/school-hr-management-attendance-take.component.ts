import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-hr-management-attendance-take',
  templateUrl: './school-hr-management-attendance-take.component.html',
  styleUrls: ['./school-hr-management-attendance-take.component.scss']
})
export class SchoolHrManagementAttendanceTakeComponent implements OnInit {
	isIcon = true;
  constructor() { }

  ngOnInit() {
  }
	togglePresent(data) {
		data.isPresent = !data.isPresent;
	}

	toggleTake() {
		this.isIcon = !this.isIcon;
	}

}
