import {NgModule} from '@angular/core';

import {AdminSuperMenuItems} from './menu-items/admin/admin-super';
import {AdminEmployeeMenuItems} from './menu-items/admin/admin-employee';
import {AdminOrganizationMenuItems} from './menu-items/admin/admin-organization';

import {SchoolAdminMenuItems} from './menu-items/school/school-admin';
import {SchoolTeacherMenuItems} from './menu-items/school/school-teacher';
import {SchoolRegistrarMenuItems} from './menu-items/school/school-registrar';
import {SchoolAccountantMenuItem} from './menu-items/school/school-accountant';
import {SchoolLibrarianMenuItem} from './menu-items/school/school-librarian';
import {SchoolHrManagementMenuItem} from './menu-items/school/school-hr';
import {SchoolGuardianMenuItem} from './menu-items/school/school-guardian';
import {SchoolStudentMenuItem} from './menu-items/school/school-student';
import {AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective} from './accordion';
import {ToggleFullscreenDirective} from './fullscreen/toggle-fullscreen.directive';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    ToggleFullscreenDirective,
    AccordionDirective
  ],
  providers: [
    AdminSuperMenuItems,
    AdminOrganizationMenuItems,
    AdminEmployeeMenuItems,
    SchoolAdminMenuItems,
    SchoolTeacherMenuItems,
    SchoolAccountantMenuItem,
    SchoolLibrarianMenuItem,
    SchoolGuardianMenuItem,
    SchoolStudentMenuItem,
    SchoolHrManagementMenuItem,
    SchoolRegistrarMenuItems
  ]
})
export class SharedModule {
}
