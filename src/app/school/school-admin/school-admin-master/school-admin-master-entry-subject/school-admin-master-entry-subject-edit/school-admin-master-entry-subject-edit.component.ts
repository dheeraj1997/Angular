import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../../shared/services/school.service';
import {SubjectService} from '../../../../../shared/services/subject.service';

const ls = localStorage;

@Component({
	selector: 'app-school-admin-master-entry-subject-edit',
	templateUrl: './school-admin-master-entry-subject-edit.component.html',
	styleUrls: ['./school-admin-master-entry-subject-edit.component.scss']
})
export class SchoolAdminMasterEntrySubjectEditComponent implements OnInit {
	subjectData = {
		name: '',
		schoolId: ''
	};
	userData = JSON.parse(ls.getItem('userData'));
	schoolData = {};

	constructor(private school: SchoolService,
		private subject: SubjectService,
		private router: Router,
		private route: ActivatedRoute,
		private alert: ToastrService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const subjectId = params['subjectId'];
			console.log('subjectId', subjectId);
			this.subject.getSubjectById(subjectId)
			.map(x => x.json())
			.subscribe(res => {
				console.log('res', res);
				if (res.success) {
					this.subjectData = res.data;
				} else {
					this.alert.error(res.error, 'Fatal Error!');
				}
			}, err => {
				this.alert.error('Something went wrong!', 'Fatal Error!');
				this.router.navigate(['/school/admin/subject/view']);
			})
		});
		this.school.getSchoolByLoginId(this.userData._id.toString())
		.map(x => x.json())
		.subscribe(res => {
			console.log('res', res);
			if (res && res.data && res.data._id) {
				this.schoolData = res.data;
				this.subjectData.schoolId = res.data._id.toString();
			} else {
				this.alert.error('Not able to fetch school information!', 'Reload Page');
			}
		})
	}

	save() {
		if (
			!this.subjectData.schoolId ||
			!this.subjectData.name
			) {
			this.alert.error('Data Incomplete', 'Error');
		return;
	}
	this.subject.editSubject(this.subjectData)
	.map(x => x.json())
	.subscribe(res => {
		console.log('res', res);
		this.alert.success(res.message, 'Success');
		this.router.navigate(['/school/admin/master/subject/add']);
	});
}
}
