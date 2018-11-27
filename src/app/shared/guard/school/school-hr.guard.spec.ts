import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolHrGuard } from './school-hr.guard';

describe('SchoolHrGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolHrGuard]
    });
  });

  it('should ...', inject([SchoolHrGuard], (guard: SchoolHrGuard) => {
    expect(guard).toBeTruthy();
  }));
});
