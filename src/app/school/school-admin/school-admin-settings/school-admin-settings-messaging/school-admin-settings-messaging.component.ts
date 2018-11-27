import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-school-admin-settings-messaging',
  templateUrl: './school-admin-settings-messaging.component.html',
  styleUrls: ['./school-admin-settings-messaging.component.scss']
})
export class SchoolAdminSettingsMessagingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  settingSave() {
    console.log('settingSave');
  }

}
