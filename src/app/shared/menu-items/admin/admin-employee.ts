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

const EMPLOYEEMENUITEMS = [
  {
    state: '/admin/employee/dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '',
    name: 'Schools',
    type: 'sub',
    icon: 'basic-book-pencil',
    badge: [],
    children: [
      {
        state: '/admin/employee/school/add',
        name: 'Add School',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/admin/employee/school/view',
        name: 'View School',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  }
];

@Injectable()
export class AdminEmployeeMenuItems {
  getAll(): Menu[] {
    console.log('MENUITEMS', EMPLOYEEMENUITEMS);
    return EMPLOYEEMENUITEMS;
  }
}
