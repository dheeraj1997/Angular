import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {RouterModule} from '@angular/router';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {single, generateData} from '../../../shared/chartData';
import {SchoolService} from '../../../shared/services/school.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StudentService} from '../../../shared/services/student.service';

const ls = localStorage ; 
@Component({
	selector: 'app-school-registrar-dashboard',
	templateUrl: './school-registrar-dashboard.component.html',
	styleUrls: ['./school-registrar-dashboard.component.scss']
})
export class SchoolRegistrarDashboardComponent implements OnInit {

	single: any[];
	graph: {
		links: any[],
		nodes: any[]
	};
	dateData: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  roundDomains = false;
  colorScheme = {
  	domain: [
  	'#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
  	]
  };
  schemeType = 'ordinal';
  // line interpolation
  curve = shape.curveLinear;
  // line, area
  timeline = false;
  // margin
  margin = false;
  marginTop = 40;
  marginRight = 40;
  marginBottom = 40;
  marginLeft = 40;
  // gauge
  gaugeMin = 0;
  gaugeMax = 50;
  gaugeLargeSegments = 10;
  gaugeSmallSegments = 5;
  gaugeTextValue = '';
  gaugeUnits = 'alerts';
  gaugeAngleSpan = 240;
  gaugeStartAngle = -120;
  gaugeShowAxis = true;
  gaugeValue = 50; // linear gauge value
  gaugePreviousValue = 70;

  userData = JSON.parse(ls.getItem('userData'));
  staffData = {};
  schoolData = {
  	_id: '',
  	name: ''
  };
  noticeData: {};
  totalTeacher = 0;
  totalStudent = 0;
   

  constructor(private teacher: TeacherService,
  	private student: StudentService,
  	private school: SchoolService,
  	private staff: StaffService,
  	private notice: NoticeService) {
  	Object.assign(this, {
  		single
  	});
  	this.dateData = generateData(5, false);
  }

  select(data) {
  	console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
  	console.log('Legend clicked', entry);
  }

  ngOnInit() {
  	this.userData = JSON.parse(ls.getItem('userData'));
  	this.staff.getStaffByLoginId(this.userData._id.toString())
  	.map(x => x.json())
  	.subscribe(sres => {
  		if (sres && sres.data && sres.data._id) {
  			this.staffData = sres.data;
  			console.log('sres', sres.data);
  			this.school.getSchoolById(sres.data.schoolId)
  			.map(x => x.json())
  			.subscribe(scres => {
  				this.schoolData = scres.data;
  				console.log('scres', scres.data);
  				this.notice.getNoticeBySchoolId(scres.data._id, 'registrars')
  				.map(x => x.json())
  				.subscribe(nres => {
  					this.noticeData = nres.data;
  					console.log('nres', nres);
  				});

  				this.teacher.getTeachersCount(scres.data._id)
  				.map(x => x.json())
  				.subscribe(resT => {
  					this.totalTeacher = resT.data;
  					console.log('totalTeacher', resT)
  				});

  				this.student.getStudentsCount(scres.data._id)
  				.map(x => x.json())
  				.subscribe(resS => {
  					console.log('getStudentsCount', resS);
  					this.totalStudent = resS.data;
  				});

  			})
  		}
  	})

  }
}
