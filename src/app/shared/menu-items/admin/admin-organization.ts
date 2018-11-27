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

const ORGANIZATIONMENUITEMS = [
  {
    state: '/admin/organization/dashboard',
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
        state: '/admin/organization/school/add',
        name: 'Add School',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/admin/organization/school/view',
        name: 'View School',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  }
];

@Injectable()
export class AdminOrganizationMenuItems {
  getAll(): Menu[] {
    console.log('MENUITEMS', ORGANIZATIONMENUITEMS);
    return ORGANIZATIONMENUITEMS;
  }
}
