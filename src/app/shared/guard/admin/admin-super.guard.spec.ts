import { TestBed, async, inject } from '@angular/core/testing';

import { AdminSuperGuard } from './admin-super.guard';

describe('AdminSuperGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSuperGuard]
    });
  });

  it('should ...', inject([AdminSuperGuard], (guard: AdminSuperGuard) => {
    expect(guard).toBeTruthy();
  }));
});
