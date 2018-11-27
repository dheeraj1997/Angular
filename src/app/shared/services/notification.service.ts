import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const ls = localStorage;
firebase.initializeApp({
  apiKey: 'AIzaSyBL-ZZ6wNyoHD4JtMV7DfoDUop8Pjjq5gQ',
  authDomain: 'inforida-1518888945801.firebaseapp.com',
  databaseURL: 'https://inforida-1518888945801.firebaseio.com',
  projectId: 'inforida-1518888945801',
  storageBucket: 'inforida-1518888945801.appspot.com',
  messagingSenderId: '884661443829'
});

@Injectable()
export class NotificationService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(private alert: ToastrService) {
  }


  updateToken(token) {
    ls.setItem('fcmToken', token);
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token);
        this.updateToken(token)
      }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.messaging.onMessage((payload: any) => {
      console.log('Message received. ', payload);
      this.alert.info(payload.notification.title, payload.notification.body, {});
      this.currentMessage.next(payload)
    });

  }
}
