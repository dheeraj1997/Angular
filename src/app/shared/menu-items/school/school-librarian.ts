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

const LIBRARIANMENUITEMS = [
  {
    state: '/school/librarian/school-librarian-admin-super-dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: '/school/librarian/notice',
    name: 'Notice Board',
    type: 'link',
    icon: 'music-volume-down'
  },
  // {
  //   state: '/school/librarian/calendar',
  //   name: 'Event Calendar',
  //   type: 'link',
  //   icon: 'basic-calendar'
  // },
  {
    state: '',
    name: 'Books',
    type: 'sub',
    icon: 'basic-book',
    badge: [],
    children: [
      {
        state: '/school/librarian/books/add',
        name: 'Add Books',
        type: 'link',
        icon: 'arrows-square-plus',
      },
      {
        state: '/school/librarian/books/view',
        name: 'View Books',
        type: 'link',
        icon: 'basic-eye',
      }
    ]
  },
  {
    state: '',
    name: 'Manage Books',
    type: 'sub',
    icon: 'basic-book-pencil',
    badge: [],
    children: [
      {
        state: '/school/librarian/manage/issueBook',
        name: 'Issue Book',
        type: 'link',
        icon: 'basic-eye',
      },
      {
        state: '/school/librarian/manage/return',
        name: 'View Issued Book',
        type: 'link',
        icon: 'basic-eye',
      },
      
    ]
  },
  // {
  //   state: '',
  //   name: 'Drive',
  //   type: 'sub',
  //   icon: 'folder',
  //   badge:[],
  //   children: [
  //     {
  //       state: '/school/librarian/drive/add',
  //       name: 'Add Drive',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     },
  //      {
  //       state: '/school/librarian/drive/view',
  //       name: 'View Drive',
  //       type: 'link',
  //       icon: 'basic-eye',
  //     }
  //     ]
  // },
  // {
  //   state: '/school/librarian/report',
  //   name: 'Report',
  //   type: 'link',
  //   icon: 'basic-todo-txt',
  //   badge: []
  // }
];

@Injectable()
export class SchoolLibrarianMenuItem {
  getAll(): Menu[] {
    console.log('MENUITEMS', LIBRARIANMENUITEMS);
    return LIBRARIANMENUITEMS;
  }
}
