import { Injectable } from '@angular/core';

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

const HRMANAGEMENTMENUITEMS = [
  {
    state: '/school/hr/school-hr-management-dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '/school/hr/messaging',
    name: 'Messaging',
    type: 'link',
    icon: 'envelope-letter'
  },
  {
    state: '/school/hr/notice',
    name: 'Notice Board',
    type: 'link',
    icon: 'film'
  },
  // {
  //   state: '/school/hr/calendar',
  //   name: 'Event Calendar',
  //   type: 'link',
  //   icon: 'event'
  // },
  {
    state: '',
    name: 'Attendance',
    type: 'sub',
    icon: 'people',
    badge: [],
    children: [
      {
        state: '/school/hr/attendance/take',
        name: 'Take attendance',
        type: 'link',
        icon: 'plus',
      },
      {
        state: '/school/hr/attendance/view',
        name: 'View attendance',
        type: 'link',
        icon: 'basic-eye',
      },
      {
        state: '/school/hr/attendance/add',
        name: 'Add attendance',
        type: 'plus',
        icon: 'arrows-square-plus',
      }
    ]
  },
  // {
  //   state: '',
  //   name: 'Drive',
  //   type: 'sub',
  //   icon: 'folder',
  //   badge: [],
  //   children: [
  //     {
  //       state: '/school/hr/drive/add',
  //       name: 'Add Drive',
  //       type: 'link',
  //       icon: 'arrows-square-plus',
  //     },
  //     {
  //       state: '/school/hr/drive/view',
  //       name: 'View Drive',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //   ]
  // },
    // {
    //   state: '/school/hr/report',
    //   name: 'Report',
    //   type: 'link',
    //   icon: 'note',
    //   badge: []
    // }
  ];


@Injectable()
export class SchoolHrManagementMenuItem {
  getAll(): Menu[] {
    console.log('MENUITEMS', HRMANAGEMENTMENUITEMS);
    return HRMANAGEMENTMENUITEMS;
  }
}
