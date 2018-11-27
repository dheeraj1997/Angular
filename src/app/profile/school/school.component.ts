import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../shared/services/school.service';

const ls = localStorage;

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  userData = {_id: '', username: ''};
  userType = {type: '', category: ''};
  userName = '';
  justifyVal = 'left';
  schoolData = {
    name: '',
    establishedYear: 2018,
    profilePicture: 'assets/images/profile.jpg',
    coverPicture: 'https://orion-uploads.openroadmedia.com/lg_6514ecde6235-blur-1283865_1920.jpg',
    picGallery: [],
    about: '',
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
    createdById: '',
    location: {
      latitude: 0,
      longitude: 0,
      accuracy: 0
    }
  };
  isOwnProfile = false;

  constructor(private router: Router,
              private alert: ToastrService,
              private school: SchoolService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.route.params.subscribe(par => {
      console.log(par);
      this.userName = par.userName;
      if (this.userName.toString() === this.userData.username.toString()) {
        this.isOwnProfile = true;
      }
      this.school.getByUserName(this.userName)
        .map(x => x.json())
        .subscribe(res => {
          if (res.success) {
            const temp = res.data;
            if (!temp.profilePicture) {
              temp.profilePicture = this.schoolData.profilePicture;
            }
            if (!temp.coverPicture) {
              temp.coverPicture = this.schoolData.coverPicture;
            }
            if (!temp.location) {
              temp.location = this.schoolData.location;
            }
            if (!temp.picGallery) {
              temp.picGallery = this.schoolData.picGallery;
            }
            if (!temp.contact) {
              temp.contact = this.schoolData.contact;
            }
            if (!temp.address) {
              temp.address = this.schoolData.address;
            }
            temp.about = ' This is a wider card with supporting text below as a natural' +
              ' lead-in to additional content.';
            this.schoolData = temp;
          } else {
            this.router.navigate(['/error/404']);
          }
        })
    })
  }

}
