import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {LoginUser} from '../../shared/exports';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/authentication.service';

const ls = localStorage;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  a = true;
  b = false;
  c = false;
  isDisable = true;
  isDisableO = false;
  isDisableP = false;
  userName = '';
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alert: ToastrService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      otp: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.compose([Validators.required])],

    });
  }

  onSubmitUsername(userName) {
    this.userName = userName;
    this.auth.forget(userName)
      .map(x => x.json())
      .subscribe(res => {
        console.log('submitUsername res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success!!');
          this.a = false;
          this.b = true;
        } else {
          this.alert.error(res.message, 'Error!!');
        }
      })
  }

  onSubmitOtp(otp) {
    this.auth.submitForgetOtp({username: this.userName, otp: otp})
      .map(x => x.json())
      .subscribe(res => {
        console.log('submitUsername res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success!!');
          this.a = false;
          this.b = false;
          this.c = true;
        } else {
          this.alert.error(res.message, 'Error!!');
        }
      })
  }

  onSubmitPassword(password, cp) {
    if (password !== cp) {
      this.alert.error('Password do not match', 'Error!!');
      return;
    }
    this.auth.submitForgetPassword({username: this.userName, password: password})
      .map(x => x.json())
      .subscribe(res => {
        console.log('submitUsername res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success!!');
          this.router.navigate(['/user/login']);
        } else {
          this.alert.error(res.message, 'Error!!');
        }
      })
  }
}
