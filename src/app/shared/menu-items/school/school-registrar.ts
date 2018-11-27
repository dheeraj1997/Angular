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

const REGISTRARMENUITEMS = [
  {
    state: '/school/registrar/school-registrar-admin-super-dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '/school/registrar/notice',
    name: 'Notice Board',
    type: 'link',
    icon: 'film'
  },
  // {
  //   state: '/school/registrar/calendar',
  //   name: 'Event Calendar',
  //   type: 'link',
  //   icon: 'event'
  // },

  {
    state: '/school/registrar/student/view',
    name: 'Add student',
    type: 'link',
    icon: 'people'
  },
  // {
  //   state: '/school/registrar/report',
  //   name: 'Report',
  //   type: 'link',
  //   icon: 'note',
  //   badge: [{type: 'info', value: 'coming soon'}]
  // }
];

@Injectable()
export class SchoolRegistrarMenuItems {
  getAll(): Menu[] {
    console.log('MENUITEMS', REGISTRARMENUITEMS);
    return REGISTRARMENUITEMS;
  }
}
