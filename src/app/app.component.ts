import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {NotificationService} from './shared/services/notification.service';


declare let ga: Function;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  message;

  constructor(public router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    console.log('app onit');
    this.notificationService.getPermission();
    this.notificationService.receiveMessage();
    this.message = this.notificationService.currentMessage;
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType && user.userType.type && user.userType.category) {
      const currentUrl = window.location.href;
      const currentUrlArr = currentUrl.split('/');
      console.log('currentUrlArr', currentUrlArr);
      let toSendUrl = user.userType.type + '/' + user.userType.category;
      if (currentUrlArr.length > 4) {
        toSendUrl = currentUrlArr.splice(3, currentUrlArr.length).join('/');
      }
      if (currentUrlArr[3] !== 'profile') {
        console.log('toSendUrl', toSendUrl);
        this.router.navigate(['/' + toSendUrl]);
      }
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('app onit ga');
        console.log('app onit ga', event.urlAfterRedirects);
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}
