import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleAnalyticsEventsService} from '../../shared/services/google-analytics-events.service';

declare let ga: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headingData = {
    heading: 'INFORIDA',
    text: 'An intelligent institute management system to accommodate the ' +
    'varied needs of a school, teacher, parents and students with matrices and reporting.'
  };
  testimonialData = [];
  featureData = [
    {
      icon: 'fa-list-alt',
      title: 'Student Registration',
      text: 'Manage Students registration and keep an eye at admission progress any time anywhere. '
    },
    {
      icon: 'fa-map',
      title: 'Time Table',
      text: 'Use our simple solution to manage your teaching staff’s schedule and keep them engaged in educational activities.'
    },
    {
      icon: 'fa-list-alt',
      title: 'Attendance Tracking',
      text: 'Enjoy a simple and innovative way of taking attendance of students and staffs digitally.'
    },
    {
      icon: 'fa-rupee',
      title: 'Fee and Expenses',
      text: 'Collect Fees and manage expenses of your institution. Send reminders about dues to parents.  '
    },
    {
      icon: 'fa-book',
      title: 'Library Management',
      text: 'List and manage books and issue it to students online. Keep track of all books and manage fine.  '
    },
    {
      icon: 'fa-list-alt',
      title: 'Notice Board',
      text: 'An easy way to communicate with ' +
      'parents, students & staff and keep them ' +
      'updated about upcoming events and necessary information. '
    },

    {
      icon: 'fa-cloud-download',
      title: 'E-Drive',
      text: 'Share documents and files between staff, students & parents. '
    },

    {
      icon: 'fa-handshake-o',
      title: 'School CRM',
      text: 'Stay in touch with current and previous students & parents and keep them engaged with social content feeds. '
    },


  ];
  aboutData = 'INFORIDA is a Cloud-based Smart Attendance & School Management System for Schools,' +
    ' Colleges, and Coaching Institutes to monitor daily attendance of students, track their ' +
    'educational outputs and provide assistant and guidelines for better education. It helps in ' +
    'tracking attendance records, monitor and manage teaching staffs, and also provide a better ' +
    'tool for school engagement. Our main focus is to have a clear picture of each student\'s educational ' +
    'journey and assist them in their areas of interest for a better future. Giving an ' +
    'effective and powerful tool to passionate educators to provide a better ' +
    'learning environment for learners at their schools.';
  clientData = [
    {
      name: 'Sainik Sanjeevani Public School',
      location: 'Sitapur',
      logo: ''
    },
    {
      name: 'Smart Kids Play School',
      location: 'Lucknow',
      logo: ''
    }, {
      name: 'Career Convent School',
      location: 'Lakhimpur',
      logo: ''
    }, {
      name: 'New Career Convent Public School',
      location: 'Lakhimpur',
      logo: ''
    }, {
      name: 'Ganga Chaturbhuj Inter College',
      location: 'Sitapur',
      logo: ''
    }, {
      name: 'A.P.S Memorial Public School',
      location: 'Lucknow',
      logo: ''
    },
    {
      name: 'M.K.D. Education Institute',
      location: 'Sitapur',
      logo: ''
    }, {
      name: 'The Indian Academy',
      location: 'Lakhimpur',
      logo: ''
    }, {
      name: 'Pt. Deen Dayal Upadhyaya Sarasvati Vidhya Mandir',
      location: 'Lakhimpur',
      logo: ''
    },
    {
      name: 'Arya Adarsh Senior Sec. School ',
      location: 'Panipat-Haryana',
      logo: ''
    }, {
      name: 'Saraswati Shishu Mandir',
      location: 'Sitapur',
      logo: ''
    }, {
      name: 'D.P.Verma Memorial Degree College',
      location: 'Sitapur',
      logo: ''
    }
  ];

  constructor(public router: Router, public gaEvent: GoogleAnalyticsEventsService) {
  }

  ngOnInit() {
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }

}
