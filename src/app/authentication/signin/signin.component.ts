import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {LoginUser} from '../../shared/exports';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/authentication.service';

const ls = localStorage;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  fcmToken = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private auth: AuthService) {
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', user);
    if (user && user.userType && user.userType.type && user.userType.category) {
      const currentUrl = window.location.href;
      const currentUrlArr = currentUrl.split('/');
      console.log('currentUrlArr', currentUrlArr);
      let toSendUrl = user.userType.type + '/' + user.userType.category;
      // console.log('toSendUrl', toSendUrl);
      if (currentUrlArr.length > 5) {
        console.log('toSendUrl', toSendUrl);
        toSendUrl = currentUrlArr.splice(3, currentUrlArr.length).join('/');
      }
      console.log('toSendUrl', toSendUrl);
      this.router.navigate(['/' + toSendUrl]);
    }
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.route.queryParams.subscribe((params: Params) => {
      const fcmToken = params['fcmToken'];
      console.log('fcmToken', fcmToken);
      if (fcmToken && !ls.getItem('fcmToken')) {
        ls.setItem('fcmToken', fcmToken);
      }
      this.fcmToken = ls.getItem('fcmToken');
      console.log('this.fcmToken', this.fcmToken);
    });
  }

  onSubmit(u, p) {
    const user: LoginUser = new LoginUser(u, p, this.fcmToken);
    console.log('user', user);
    this.auth.login(user)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        this.toast.success(res.message, 'Success');
        let routeUrl = '';
        if (res.data.userType && res.data.userType.type) {
          ls.setItem('userData', JSON.stringify(res.data));
          routeUrl = '/' + res.data.userType.type;
          if (res.data.userType.type) {
            routeUrl = routeUrl + '/' + res.data.userType.category;
          }
          console.log('routeUrl', routeUrl);
          this.router.navigate([routeUrl]);
        }
      }, err => {
        err = err.json();
        console.log('err', err);
        console.log('err.error', err.error);
        this.toast.error(err.error, 'Error');
      });
  }
}
