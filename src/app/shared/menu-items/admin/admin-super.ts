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

const MENUITEMS = [
  {
    state: '/admin/super/dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '',
    name: 'School',
    type: 'sub',
    icon: 'basic-book-pencil',
    badge: [],
    children: [
      {
        state: '/admin/super/school/add',
        name: 'Add School',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/admin/super/school/view',
        name: 'View School',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  },
  {
    state: '',
    name: 'Employee',
    type: 'sub',
    icon: 'basic-case',
    badge: [],
    children: [
      {
        state: '/admin/super/employee/add',
        name: 'Add Employee',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/admin/super/employee/view',
        name: 'View Employee',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  },
  {
    state: '',
    name: 'Organization',
    type: 'sub',
    icon: 'organization',
    badge: [],
    children: [
      {
        state: '/admin/super/organization/add',
        name: 'Add Organization',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/admin/super/organization/view',
        name: 'View Organization',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  }
];

@Injectable()
export class AdminSuperMenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
