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

const ACCOUNTANTMENUITEMS = [
  {
    state: '/school/accountant/school-accountant-admin-super-dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '/school/accountant/notice',
    name: 'Notice Board',
    type: 'link',
    icon: 'film'
  },
  // {
  //   state: '/school/accountant/event calendar',
  //   name: 'Event Calendar',
  //   type: 'link',
  //   badge: [{type: 'info', value: 'coming soon'}],
  //   icon: 'event'
  // },
  {
    state: '/school/accountant/fees/view',
    name: 'Fees',
    type: 'link',
    icon: 'basic-book-pencil'
  },
  {
    state: '/school/accountant/transport/view',
    name: 'Transport',
    type: 'link',
    icon: 'plane'
  },
  // {
  //   state: '',
  //   name: 'Transport',
  //   type: 'sub',
  //   icon: 'basic-plane',
  //   badge: [],
  //   children: [
  //     {
  //       state: '/school/accountant/transport/add',
  //       name: 'Add Transport Fee',
  //       type: 'link',
  //       icon: 'arrows-square-plus',
  //     },
  //     {
  //       state: '/school/accountant/transport/view',
  //       name: 'View Transport Fee',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //   ]
  // },
  // {
  //   state: '/school/admin/notice/view',
  //   name: 'Notice',
  //   type: 'link',
  //   icon: 'music-volume-down',
  //   badge: []
  // },
  {
    state: '/school/accountant/expenses/view',
    name: 'Expenses',
    type: 'link',
    icon: 'minus'
  },
  // {
  //   state: '',
  //   name: 'Drive',
  //   type: 'sub',
  //   icon: 'folder',
  //   badge: [{type: 'info', value: 'coming soon'}],
  //   children: [
  //     {
  //       state: '/school/accountant/drive/add',
  //       name: 'Add To Drive',
  //       type: 'link',
  //       icon: 'arrows-square-plus',
  //     },
  //     {
  //       state: '/school/accountant/drive/view',
  //       name: 'View Drive',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //   ]
  // },
  // {
  //   state: '/school/accountant/report',
  //   name: 'Report',
  //   type: 'link',
  //   icon: 'note',
  //   badge: [{type: 'info', value: 'coming soon'}]
  // }
];


@Injectable()
export class SchoolAccountantMenuItem {
  getAll(): Menu[] {
    console.log('MENUITEMS', ACCOUNTANTMENUITEMS);
    return ACCOUNTANTMENUITEMS;
  }
}
