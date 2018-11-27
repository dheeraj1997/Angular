import { TestBed, async, inject } from '@angular/core/testing';

import { AdminEmployeeGuard } from './admin-employee.guard';

describe('AdminEmployeeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEmployeeGuard]
    });
  });

  it('should ...', inject([AdminEmployeeGuard], (guard: AdminEmployeeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
