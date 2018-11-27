import { TestBed, async, inject } from '@angular/core/testing';

import { AdminOrganizationGuard } from './admin-organization.guard';

describe('AdminOrganizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOrganizationGuard]
    });
  });

  it('should ...', inject([AdminOrganizationGuard], (guard: AdminOrganizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
