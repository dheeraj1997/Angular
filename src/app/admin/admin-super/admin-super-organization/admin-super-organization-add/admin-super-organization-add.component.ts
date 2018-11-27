import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GoogleAnalyticsEventsService} from '../../../../shared/services/google-analytics-events.service';
import {AddressService} from '../../../../shared/services/address.service';
import {OrganizationService} from '../../../../shared/services/organization.service';

const ls = localStorage ;

@Component({
  selector: 'app-admin-super-organization-add',
  templateUrl: './admin-super-organization-add.component.html',
  styleUrls: ['./admin-super-organization-add.component.scss']
})
export class AdminSuperOrganizationAddComponent implements OnInit {

	userData = {
    _id: ''
  };
  organizationData = {
    name: '',
    establishedYear: '',
    contact: {
      phone: [''],
      email: [''],
      website: '',
      fax: ''
    },
    address: {
      village: '',
      block: '',
      district: '',
      state: '',
      country: 'India',
      pin: '',
      completeAddress: ''
    },
    affiliation: {
      board :['']
    },
    username: '',
    password: '',
    createdById: '',

  };
  confirmPass = '';

  constructor(private alert: ToastrService,
    private router: Router,
    private address: AddressService,
    private gaEvent: GoogleAnalyticsEventsService,
    private organization: OrganizationService) { }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.organizationData.createdById = this.userData._id.toString()
  }

  getDetailsFromPin(e) {
    if (e.length === 6) {
      this.address.getAddressByPin(e)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res) {
          this.organizationData.address.district = res.District;
          this.organizationData.address.state = res.State;
          this.alert.success('Fetched info from pin code', 'Success');
        } else {
          this.alert.error('Can\'t find information from pin code!', 'Error');
        }
      }, err => {
        console.log('err', err);
        this.alert.error('Can\'t find information from pin code!', 'Error');
      });
    }
  }
  addBoard() {
    this.organizationData.affiliation.board.push('');
  }

  addPhone() {
    this.organizationData.contact.phone.push('');
  }

  addEmail() {
    this.organizationData.contact.email.push('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
  submitOrganization(){
    console.log('organizationData',this.organizationData);
    if(!this.organizationData.name ||
      !this.organizationData.contact.phone[0] ||
      !this.organizationData.affiliation.board[0] ||
      !this.organizationData.address.completeAddress ||
      !this.organizationData.username ||
      !this.organizationData.password)
    {
      this.alert.error('Required fields Empty');
      return;
    } else {
      this.organization.saveOrganization(this.organizationData)
        .map(x=>x.json())
    .subscribe(res=>{
      this.alert.success(res.message, 'Success');
      this.router.navigate(['/admin/super/organization/view']) ;
      err => {
        err = err.json();
        console.log('err', err);
        this.alert.error(err.error, 'Error');
       console.log('organizationData',this.organizationData);
       }
    })
  }
  }
}
