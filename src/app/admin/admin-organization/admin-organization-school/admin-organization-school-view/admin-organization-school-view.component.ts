import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {OrganizationService} from '../../../../shared/services/organization.service';

const ls = localStorage ;

@Component({
	selector: 'app-admin-organization-school-view',
	templateUrl: './admin-organization-school-view.component.html',
	styleUrls: ['./admin-organization-school-view.component.scss']
})
export class AdminOrganizationSchoolViewComponent implements OnInit {
	schoolList = [];
	searchString: string;
	initialData = '';
	nameToDelete = '';
	userData = {
		_id: ''
	};
	organizationData = {
		_id :'',
	};
	constructor(private school: SchoolService,
		private alert: ToastrService,
		private organization: OrganizationService,
		private router: Router,
		private modalService: NgbModal,) { }

	ngOnInit() {
		this.userData = JSON.parse(ls.getItem('userData'));
		this.organization.getOrganizationByLoginId(this.userData._id)
		.map(x=>x.json())
		.subscribe(res=>{
			this.organizationData = res.data ;
			console.log('organizationData', this.organizationData);
			console.log('id',this.organizationData._id);
			this.getOrganizationSchool();
		})
		
	}

	getOrganizationSchool(){
		
		this.school.getOrganizationSchools(this.organizationData._id)
		.map(x=>x.json())
		.subscribe(sres=>{
			this.schoolList = sres.data ;
			console.log('schoolList', this.schoolList);
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

	delete(school, index, content) {
		this.nameToDelete = school.name;
		this.modalService.open(content)
		.result.then((result) => {
			if (result === 'yes') {
				this.school.deleteSchool(school._id)
				.map(x => x.json())
				.subscribe(res => {
					console.log('res', res);
					if (res.success) {
						this.schoolList.splice(index, 1);
						this.alert.success(school.name + ' deleted successfully!', 'Success!');
					} else {
						this.alert.error('Something went wrong!', 'Error!!');
					}
				});
			} else if (result === 'cancel') {
				this.alert.info(school.name + ' not deleted!', 'Information!');
			} else {
				this.alert.error(school.name + ' not deleted!', 'Error!');
			}
		}, (reason) => {
			this.alert.info(school.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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
