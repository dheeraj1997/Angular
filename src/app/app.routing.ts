import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {MenuLayoutComponent} from './layouts/menu-layout/menu-layout.component';
import {SchoolTeacherGuard} from './shared/guard/school/school-teacher.guard';
import {SchoolAccountantGuard} from './shared/guard/school/school-accountant.guard';
import {SchoolAdminGuard} from './shared/guard/school/school-admin.guard';
import {SchoolLibrarianGuard} from './shared/guard/school/school-librarian.guard';
import {SchoolStudentGuard} from './shared/guard/school/school-student.guard';
import {SchoolGuardianGuard} from './shared/guard/school/school-guardian.guard';
import {SchoolHrGuard} from './shared/guard/school/school-hr.guard';
import {SchoolOtherGuard} from './shared/guard/school/school-other.guard';
import {AdminEmployeeGuard} from './shared/guard/admin/admin-employee.guard';
import {AdminSuperGuard} from './shared/guard/admin/admin-super.guard';
import {SchoolRegistrarGuard} from './shared/guard/school/school-registrar.guard';
import {AdminOrganizationGuard} from './shared/guard/admin/admin-organization.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './landing/landing.module#LandingModule'
      }
    ]
  }, {
    path: 'profile',
    children: [
      {
        path: '',
        loadChildren: './profile/profile.module#ProfileModule'
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'super',
        component: MenuLayoutComponent,
        canActivate: [AdminSuperGuard],
        data: {
          type: 'admin-super'
        },
        children: [
          {
            path: '',
            loadChildren: './admin/admin-super/admin-super.module#AdminSuperModule'
          }
        ]
      },
      {
        path: 'employee',
        canActivate: [AdminEmployeeGuard],
        data: {
          type: 'admin-employee'
        },
        component: MenuLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: './admin/admin-employee/admin-employee.module#AdminEmployeeModule'
          }
        ]
      },
      {
        path: 'organization',
        component: MenuLayoutComponent,
        canActivate: [AdminOrganizationGuard],
        data: {
          type: 'admin-organization'
        },
        children: [
          {
            path: '',
            loadChildren: './admin/admin-organization/admin-organization.module#AdminOrganizationModule'
          }
        ]
      },
    ]
  },
  {
    path: 'school',
    children: [
      {
        path: 'accountant',
        component: MenuLayoutComponent,
        canActivate: [SchoolAccountantGuard],
        data: {
          type: 'school-accountant'
        },
        loadChildren: './school/school-accountant/school-accountant.module#SchoolAccountantModule'
      },
      {
        path: 'admin',
        component: MenuLayoutComponent,
        canActivate: [SchoolAdminGuard],
        data: {
          type: 'school-admin'
        },
        loadChildren: './school/school-admin/school-admin.module#SchoolAdminModule'
      },
      {
        path: 'student',
        component: MenuLayoutComponent,
        canActivate: [SchoolStudentGuard],
        data: {
          type: 'school-student'
        },
        loadChildren: './school/school-student/school-student.module#SchoolStudentModule'
      },
      {
        path: 'guardian',
        component: MenuLayoutComponent,
        canActivate: [SchoolGuardianGuard],
        data: {
          type: 'school-guardian'
        },
        loadChildren: './school/school-guardian/school-guardian.module#SchoolGuardianModule'
      },
      {
        path: 'hr',
        component: MenuLayoutComponent,
        canActivate: [SchoolHrGuard],
        data: {
          type: 'school-hr'
        },
        loadChildren: './school/school-hr-management/school-hr-management.module#SchoolHrManagementModule'
      },
      {
        path: 'librarian',
        data: {
          type: 'school-librarian'
        },
        component: MenuLayoutComponent,
        canActivate: [SchoolLibrarianGuard],
        loadChildren: './school/school-librarian/school-librarian.module#SchoolLibrarianModule'
      }, {
        path: 'other',
        data: {
          type: 'school-other'
        },
        component: MenuLayoutComponent,
        canActivate: [SchoolOtherGuard],
        loadChildren: './school/school-other/school-other.module#SchoolOtherModule'
      }, {
        path: 'teacher',
        data: {
          type: 'school-teacher'
        },
        component: MenuLayoutComponent,
        canActivate: [SchoolTeacherGuard],
        loadChildren: './school/school-teacher/school-teacher.module#SchoolTeacherModule'
      }, {
        path: 'registrar',
        data: {
          type: 'school-registrar'
        },
        component: MenuLayoutComponent,
        canActivate: [SchoolRegistrarGuard],
        loadChildren: './school/school-registrar/school-registrar.module#SchoolRegistrarModule'
      }
    ]
  },
  {
    path: 'user',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: './authentication/authentication.module#AuthenticationModule'
    }]
  },
  {
    path: 'error',
    children: [{
      path: '',
      loadChildren: './error/error.module#ErrorModule'
    }]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }];

