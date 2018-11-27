import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../../shared/services/address.service';
import {SchoolService} from '../../../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-admin-super-school-edit',
  templateUrl: './admin-super-school-edit.component.html',
  styleUrls: ['./admin-super-school-edit.component.scss']
})
export class AdminSuperSchoolEditComponent implements OnInit {
  userData = {
    _id: ''
  };

  statusOptions = [
    {name: 'Follow Up', value: 'fu'},
    {name: 'Demo Created', value: 'dc'},
    {name: 'Lead Closed', value: 'lc'},
    {name: 'Not Interested', value: 'ni'}
  ];
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
  employeeId: string;

  constructor(private address: AddressService,
              private school: SchoolService,
              private router: Router,
              private alert: ToastrService,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const schoolId = params['schoolId'];
      console.log('schoolId', schoolId);
      this.school.getSchoolById(schoolId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            const temp = res.data;
            if (!temp.location) {
              temp.location = this.schoolData.location;
            }
            this.schoolData = temp;
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/notice/view'])
        })
    });
    this.userData = JSON.parse(ls.getItem('userData'));
    this.employeeId = this.userData._id.toString()
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

  clickedMarker() {
    console.log(`clicked the marker`)
  }

  markerDragEnd($event) {
    console.log('dragEnd', $event);
    this.schoolData.location.longitude = $event.coords.lng;
    this.schoolData.location.latitude = $event.coords.lat;
  }

  submitSchool() {
    console.log('this.schoolData', this.schoolData);
    if (
      !this.schoolData.name ||
      !this.schoolData.contact.phone[0] ||
      !this.schoolData.contact.email[0] ||
      !this.schoolData.address.pin ||
      !this.schoolData.address.district ||
      !this.schoolData.address.state ||
      !this.schoolData.address.completeAddress ||
      !this.schoolData.affiliation.board ||
      !this.schoolData.status
    ) {
      this.alert.error('Required fields Empty');
      return;
    } else {
      this.school.editSchool(this.schoolData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/admin/super/school/view'])
        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }
}
