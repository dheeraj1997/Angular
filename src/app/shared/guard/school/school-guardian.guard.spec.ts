import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolGuardianGuard } from './school-guardian.guard';

describe('SchoolGuardianGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolGuardianGuard]
    });
  });

  it('should ...', inject([SchoolGuardianGuard], (guard: SchoolGuardianGuard) => {
    expect(guard).toBeTruthy();
  }));
});
