import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildItems {
  state: string;
  name: string;
  icon?: string;
  badge?: BadgeItem[];
  type?: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  icon?: string;
  badge?: BadgeItem[];
  type?: string;
  children?: ChildItems[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const ADMINMENUITEMS = [
  {
    state: '/school/admin/dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'chart'
  },
  {
    state: '/school/admin/attendance/list',
    name: 'Attendance',
    type: 'link',
    icon: 'user-following'
  },
  {
    state: '/school/admin/message/history',
    name: 'Messaging',
    type: 'link',
    badge: [],
    icon: 'basic-message-txt'
  },
  {
    state: '/school/admin/notice/view',
    name: 'Notice',
    type: 'link',
    icon: 'music-volume-down',
    badge: []
  },
  // {
  //   state: '',
  //   name: 'Event-Calender',
  //   type: 'sub',
  //   icon: 'basic-calendar',
  //   badge: [{type: 'info', value: 'coming soon'}],
  //   children: [
  //     {
  //       state: '/school/admin/calendar/add',
  //       name: 'Add Event',
  //       type: 'link',
  //       icon: 'arrows-square-plus',
  //     },
  //     {
  //       state: '/school/admin/calendar/view',
  //       name: 'View Event',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //   ]
  // },

  {
    state: '',
    name: 'Master Entry',
    type: 'sub',
    icon: 'basic-book-pencil',
    badge: [],
    children: [
      {
        state: '/school/admin/master/session/view',
        name: 'Session',
        type: 'link',
        icon: 'basic-bookmark',

      },
      {
        state: '/school/admin/master/class/view',
        name: 'Class',
        type: 'link',
        icon: 'basic-notebook',

      },
      {
        state: '/school/admin/master/subject/view',
        name: 'Subjects',
        type: 'link',
        icon: 'book-open',

      },
      // {
      //   state: '/school/admin/master/period/view',
      //   name: 'Class Timings',
      //   type: 'link',
      //   icon: 'clock',

      // },
      {
        state: '/school/admin/timetable/view',
        name: 'Time Table',
        type: 'link',
        icon: 'basic-watch',
        badge: []
      },
      {
        state: '/school/admin/master/fee',
        name: 'Fee',
        type: 'link',
        icon: 'ecommerce-banknotes'
      }
    ]
  },
  {
    state: '/school/admin/teacher/view',
    name: 'Teachers',
    type: 'link',
    icon: 'user',
    badge: []
  },
  {
    state: '/school/admin/staff/view',
    name: 'Staff',
    type: 'link',
    icon: 'user-follow',
    badge: []
  },
  {
    state: '/school/admin/student/view',
    name: 'Students',
    type: 'link',
    icon: 'people',
    badge: []
  },
  {
    state: '/school/admin/examination/view',
    name: 'Examination',
    type: 'link',
    icon: 'graduation',
    badge: []
  },
  {
    state: '/school/admin/settings/global',
    name: 'Settings',
    type: 'link',
    icon: 'settings',
    badge: [],
  },
  {
    state: '',
    name: 'Report',
    type: 'sub',
    icon: 'basic-todo-txt',
    children: [
      {
        state: '/school/admin/report/attendance',
        name: 'Attendance Report',
        type: 'link',
        icon: 'arrows-square-plus'
      },
      {
        state: '/school/admin/report/feeledger',
        name: 'Fee Ledger',
        type: 'link',
        icon: 'ecommerce-banknotes'
      },
    ]
  },
];

@Injectable()
export class SchoolAdminMenuItems {
  getAll(): Menu[] {
    return ADMINMENUITEMS;
  }
}
