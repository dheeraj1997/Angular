import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  icon?: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const TEACHERMENUITEMS = [
  {
    state: '/school/teacher/dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '/school/teacher/notice',
    name: 'Notice Board',
    type: 'link',
    icon: 'film'
  },
  // {
  //   state: '/school/teacher/calendar',
  //   name: 'Event Calendar',
  //   type: 'link',
  //   icon: 'event'
  // },
  {
    state: '/school/teacher/time-table',
    name: 'Time Table',
    type: 'link',
    icon: 'doc'
  },
  {
    state: '/school/teacher/attendance/add',
    name: 'Attendance',
    type: 'link',
    icon: 'people',
    badge: []
  },
  {
    state: '',
    name: 'Homework',
    type: 'sub',
    icon: 'book-open',
    badge: [],
    children: [
      {
        state: '/school/teacher/homework/add',
        name: 'Give Homework',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/school/teacher/homework/view',
        name: 'View Homework',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  },
  {
    state: '',
    name: 'Result',
    type: 'sub',
    icon: 'logout',
    badge: [],
    children: [
      {
        state: '/school/teacher/result/add',
        name: 'Publish Result',
        type: 'link',
        icon: 'screen-tablet',
      },
      {
        state: '/school/teacher/result/view',
        name: 'View Result',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  },
  {
    state: '/school/teacher/admit-card',
    name: 'Admit Card',
    type: 'link',
    icon: 'logout',
    badge: []
  },
  // {
  //   state: '',
  //   name: 'Teacher Drive',
  //   type: 'sub',
  //   icon: 'folder',
  //   badge: [{type: 'info', value: 'coming soon'}],
  //   children: [
  //     {
  //       state: '/school/teacher/drive/add',
  //       name: 'Add To Drive',
  //       type: 'link',
  //       icon: 'plus',
  //     },
  //     {
  //       state: '/school/teacher/drive/view',
  //       name: 'View Drive',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //   ]
  // },
  // {
  //   state: '/school/teacher/report',
  //   name: 'Report',
  //   type: 'link',
  //   icon: 'note',
  //   badge: [{type: 'info', value: 'coming soon'}]
  // },
  // {
  //   state: '/school/teacher/ptm',
  //   name: 'Parents Teacher Meeting',
  //   type: 'link',
  //   icon: 'basic-book-pencil',
  //   badge: []
  // },
];

@Injectable()
export class SchoolTeacherMenuItems {
  getAll(): Menu[] {
    console.log('MENUITEMS', TEACHERMENUITEMS);
    return TEACHERMENUITEMS;
  }
}
