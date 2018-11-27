import {Component, OnInit, OnDestroy, ViewChild, HostListener} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LoginUser} from '../../shared/exports';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/authentication.service';
import {SchoolAdminMenuItems} from '../../shared/menu-items/school/school-admin';
import {AdminSuperMenuItems} from '../../shared/menu-items/admin/admin-super';
import {AdminEmployeeMenuItems} from '../../shared/menu-items/admin/admin-employee';
import {AdminOrganizationMenuItems} from '../../shared/menu-items/admin/admin-organization';

import {SchoolTeacherMenuItems} from '../../shared/menu-items/school/school-teacher';
import {SchoolRegistrarMenuItems} from '../../shared/menu-items/school/school-registrar';
import {SchoolAccountantMenuItem} from '../../shared/menu-items/school/school-accountant';
import {SchoolLibrarianMenuItem} from '../../shared/menu-items/school/school-librarian';
import {SchoolHrManagementMenuItem} from '../../shared/menu-items/school/school-hr';
import {SchoolStudentMenuItem} from '../../shared/menu-items/school/school-student';
import {SchoolGuardianMenuItem} from '../../shared/menu-items/school/school-guardian';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

const ls = localStorage;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;
  menuItems: any = [];
  options: Options;
  theme = 'light';
  isBoxed = false;
  isOpened = true;
  mode = 'push';
  _mode = this.mode;
  width = window.innerWidth;
  menuData = '';
  fcmToken = '';
  userName = '';
  password = '';
  userData = {userType: {type: '', category: ''}, username: ''};
  userArray = [];

  @ViewChild('sidebar') sidebar;

  constructor(public schoolAdminMenuItems: SchoolAdminMenuItems,
              private schoolTeacherMenuItems: SchoolTeacherMenuItems,
              private schoolRegistrarMenuItems: SchoolRegistrarMenuItems,
              private schoolAccountantMenuItem: SchoolAccountantMenuItem,
              private schoolLibrarianMenuItem: SchoolLibrarianMenuItem,
              private adminSuperMenuItems: AdminSuperMenuItems,
              private adminEmployeeMenuItems: AdminEmployeeMenuItems,
              private schoolHrManagementMenuItems: SchoolHrManagementMenuItem,
              private schoolStudentMenuItem: SchoolStudentMenuItem,
              private schoolGuardianMenuItem: SchoolGuardianMenuItem,
              private adminOrganizationMenuItems: AdminOrganizationMenuItems,
              private router: Router,
              private route: ActivatedRoute,
              private alert: ToastrService,
              private auth: AuthService,
              private modalService: NgbModal,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.fcmToken = ls.getItem('fcmToken');
    this.userData = JSON.parse(ls.getItem('userData'));
    this.userArray = JSON.parse(ls.getItem('userArray')) || [];
    this.route.data.subscribe(data => {
      this.menuData = data.type.split('-').join('/');
      if (data.type === 'school-admin') {
        this.menuItems = this.schoolAdminMenuItems.getAll();
      } else if (data.type === 'admin-organization') {
        this.menuItems = this.adminOrganizationMenuItems.getAll();
      } else if (data.type === 'school-teacher') {
        this.menuItems = this.schoolTeacherMenuItems.getAll();
      } else if (data.type === 'school-registrar') {
        this.menuItems = this.schoolRegistrarMenuItems.getAll();
      } else if (data.type === 'admin-super') {
        this.menuItems = this.adminSuperMenuItems.getAll();
      } else if (data.type === 'admin-employee') {
        this.menuItems = this.adminEmployeeMenuItems.getAll();
      } else if (data.type === 'school-accountant') {
        this.menuItems = this.schoolAccountantMenuItem.getAll();
      } else if (data.type === 'school-librarian') {
        this.menuItems = this.schoolLibrarianMenuItem.getAll();
      } else if (data.type === 'school-hr') {
        this.menuItems = this.schoolHrManagementMenuItems.getAll();
      } else if (data.type === 'school-student') {
        this.menuItems = this.schoolStudentMenuItem.getAll();
      } else if (data.type === 'school-guardian') {
        this.menuItems = this.schoolGuardianMenuItem.getAll();
      } else {
        this.menuItems = [];
      }
      console.log('this.menuItems', this.menuItems);

    });

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      document.querySelector('.main-content').scrollTop = 0;
      console.log('event.url', event.url);
      if (this.isOver() || event.url === '/maps/fullscreen') {
        this.isOpened = false;
      }
      // let urlArr = [];¬
      // if (event.url) {
      //   urlArr = event.url.split('/');
      //   urlArr.splice(urlArr.length - 2, 2);
      //   console.log('urlArr', urlArr);
      //   const lastItem = urlArr.pop();
      //   console.log('lastItem', lastItem);
      //   if (lastItem === 'receipt') {
      //     this.isOpened = false;
      //   }
      // }


      this.route.children.forEach((route: ActivatedRoute) => {
        let activeRoute: ActivatedRoute = route;
        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }
        this.options = activeRoute.snapshot.data;
      });
      if (this.options.hasOwnProperty('heading')) {
        this.setTitle(this.options.heading);
      }
    });
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle('Inforida | ' + newTitle + ' | Empowering Education');
  }

  toogleSidebar(): void {
    if (this._mode !== 'dock') {
      this.isOpened = !this.isOpened;
    }
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }

  toProfile() {
    const userData = JSON.parse(ls.getItem('userData'));
    if (userData.userType.type === 'school' && userData.userType.category === 'admin') {
      this.router.navigate(['/profile/school', userData.username]);
      // this.router.navigate(['/profile/school']);
    }
  }

  signOut() {
    ls.removeItem('userData');
    ls.removeItem('userArray');
    this.router.navigate(['/user']);
  }

  openSearch(search) {
    this.modalService.open(search, {windowClass: 'search', backdrop: false});
  }

  switchUser(ind) {
    const newUser = JSON.parse(JSON.stringify(this.userArray[ind]));
    this.userArray.splice(ind, 1);
    let routeUrl = '';
    if (newUser.userType && newUser.userType.type) {
      ls.setItem('userData', JSON.stringify(newUser));
      const ifExists = this.userArray.findIndex(val => val.username === this.userData.username);
      if (ifExists === -1) {
        this.userArray.unshift(this.userData);
      }
      ls.setItem('userArray', JSON.stringify(this.userArray));
      routeUrl = '/' + newUser.userType.type;
      if (newUser.userType.category) {
        routeUrl = routeUrl + '/' + newUser.userType.category;
      }
      console.log('routeUrl', routeUrl);
      // if (this.userData.userType.type === newUser.userType.type &&
      //   this.userData.userType.category === newUser.userType.category) {
      //   window.location.reload();
      // } else {
      this.router.navigate([routeUrl]);
      // }
    }
  }

  openLoginBox(search) {
    this.modalService.open(search)
      .result.then((result) => {
      if (result === 'yes') {
        const user: LoginUser = new LoginUser(this.userName, this.password, this.fcmToken);
        console.log('user', user);
        this.auth.login(user)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            this.userName = '';
            this.password = '';
            this.alert.success(res.message, 'Success');
            let routeUrl = '';
            if (res.data.userType && res.data.userType.type) {
              ls.setItem('userData', JSON.stringify(res.data));
              const ifExists = this.userArray.findIndex(val => val.username === this.userData.username);
              console.log('ifExists', ifExists);
              if (ifExists === -1) {
                this.userArray.unshift(this.userData);
              }
              ls.setItem('userArray', JSON.stringify(this.userArray));
              routeUrl = '/' + res.data.userType.type;
              if (res.data.userType.category) {
                routeUrl = routeUrl + '/' + res.data.userType.category;
              }
              console.log('routeUrl', routeUrl);
              // if (this.userData.userType.type === res.data.userType.type &&
              //   this.userData.userType.category === res.data.userType.category) {
              //   window.location.reload();
              // } else {
              this.router.navigate([routeUrl]);
              // }
            }

          }, err => {
            err = err.json();
            console.log('err', err);
            console.log('err.error', err.error);
            this.alert.error(err.error, 'Error');
          });
      } else if (result === 'cancel') {
        this.alert.info('Login Canceled', 'Information!');
      } else {
        this.alert.error('Login Canceled ', 'Error!');
      }
    }, (reason) => {
      this.alert.info('Login canceled' + ` due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'clicking on a background!';
    } else {
      return `${reason}`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.width === event.target.innerWidth) {
      return false;
    }
    if (this.isOver()) {
      this._mode = 'over';
      this.isOpened = false;
    } else {
      this._mode = this.mode;
      this.isOpened = true;
    }
    this.width = event.target.innerWidth;
  }
}
