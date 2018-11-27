import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GoogleAnalyticsEventsService} from '../../../../shared/services/google-analytics-events.service';
import {AddressService} from '../../../../shared/services/address.service';
import {OrganizationService} from '../../../../shared/services/organization.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

const ls = localStorage ;

@Component({
	selector: 'app-admin-super-organization-view',
	templateUrl: './admin-super-organization-view.component.html',
	styleUrls: ['./admin-super-organization-view.component.scss']
})
export class AdminSuperOrganizationViewComponent implements OnInit {
	userData = {
		_id: ''
	};
	organizationList = [];
	initialData: string;
	searchString: string;
	nameToDelete = '';

	constructor(private alert: ToastrService,
		private router: Router,
		private address: AddressService,
		private gaEvent: GoogleAnalyticsEventsService,
		private organization: OrganizationService,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.organization.getAll()
		.map(x => x.json())
		.subscribe(res => {
			this.organizationList = res.data;
			console.log('organization', this.organizationList)
			this.initialData = JSON.stringify(res.data);
			this.alert.success('Organization' + ' fetched');
		})
	}


	delete(organization, index, content) {
		this.nameToDelete = organization.name;
		this.modalService.open(content)
		.result.then((result) => {
			if (result === 'yes') {
				this.organization.deleteOrganization(organization._id)
				.map(x => x.json())
				.subscribe(res => {
					console.log('deleteRes', res);
					if (res.success) {
						this.organizationList.splice(index, 1);
						this.alert.success(organization.name + ' deleted successfully!', 'Success!');
					} else {
						this.alert.error('Something went wrong!', 'Error!!');
					}
				});
			} else if (result === 'cancel') {
				this.alert.info(organization.name + ' not deleted!', 'Information!');
			} else {
				this.alert.error(organization.name + ' not deleted!', 'Error!');
			}
		}, (reason) => {
			this.alert.info(organization.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
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
			this.organizationList = this.organizationList.filter(val => {
				return pattern.test(val.name);
			});
			if (!this.organizationList.length) {
				this.organizationList = JSON.parse(this.initialData);
			}
		} else {
			this.organizationList	 = JSON.parse(this.initialData);
		}
	}

	submitEvent(category, action, label?, value?) {
		this.gaEvent.emitEvent(category, action, label, value);
	}
}
