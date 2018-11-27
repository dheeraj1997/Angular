import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../../shared/services/address.service';
import {SchoolService} from '../../../../shared/services/school.service';
import { OrganizationService } from '../../../../shared/services/organization.service';
const ls = localStorage;

@Component({
  selector: 'app-admin-organization-school-add',
  templateUrl: './admin-organization-school-add.component.html',
  styleUrls: ['./admin-organization-school-add.component.scss']
})
export class AdminOrganizationSchoolAddComponent implements OnInit {
	
	userData = {
    _id: ''
  };
  boardOptions = [
  'CBSE',
  'ICSE',
  'State',
  ];
  schoolData = {
    name: '',
    establishedYear: 2018,
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
      board: '',
      code: ''
    },
      isOrganization  : false,
      organizationName : '',
      organizationId:'',
    username: '',
    password: '',
    createdById: '',
    status: '',
    comment: '',
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0
    }
  };
  confirmPass = '';
  organizationData = [];

  constructor(private address: AddressService,
    private school: SchoolService,
    private router: Router,
    private alert: ToastrService,
    private organization:OrganizationService) { }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.schoolData.createdById = this.userData._id.toString();
    this.organization.getOrganizationByLoginId(this.userData._id)
    .map(x=>x.json())
    .subscribe(res=>{
      this.organizationData = res.data ;
      this.schoolData.organizationName = res.data.name ;
      this.schoolData.organizationId = res.data._id ; 
      console.log('organizationData', this.organizationData);
    })

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        console.log('position', position);
        this.schoolData.location.latitude = position.coords.latitude;
        this.schoolData.location.longitude = position.coords.longitude;
        this.schoolData.location.accuracy = position.coords.accuracy;
      });
    }
  }

  clickedMarker() {
    console.log(`clicked the marker`)
  }

  markerDragEnd($event) {
    console.log('dragEnd', $event);
    this.schoolData.location.longitude = $event.coords.lng;
    this.schoolData.location.latitude = $event.coords.lat;
  }

  getDetailsFromPin(e) {
    if (e.length === 6) {
      this.address.getAddressByPin(e)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res) {
          this.schoolData.address.district = res.District;
          this.schoolData.address.state = res.State;
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

  addPhone() {
    this.schoolData.contact.phone.push('');
  }

  addEmail() {
    this.schoolData.contact.email.push('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  submitSchool(){
    console.log('schoolData',this.schoolData);
    console.log('this.schoolData', this.schoolData);
    if (
      !this.schoolData.name ||
      !this.schoolData.contact.phone[0] ||
      !this.schoolData.contact.email[0] ||
      !this.schoolData.address.pin ||
      !this.schoolData.address.district ||
      !this.schoolData.address.state ||
      !this.schoolData.address.completeAddress ||
      !this.schoolData.affiliation.board 
      ) {
      this.alert.error('Required fields Empty');
    return;
  } else {
    this.schoolData.isOrganization = true ;
    this.school.addOrganizationSchool(this.schoolData)
    .map(x => x.json())
    .subscribe(res => {
      console.log('res', res);
      if (res.success) {
        this.alert.success(res.message, 'Success');
        this.router.navigate(['/admin/organization/school/view'])
      } else {
        this.alert.success(res.message, 'Error');
      }
    }, err => {
      err = err.json();
      console.log('err', err);
      this.alert.error(err.error, 'Error');
    })
  }
}
}

