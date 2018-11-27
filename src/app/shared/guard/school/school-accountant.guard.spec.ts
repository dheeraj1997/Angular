import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolAccountantGuard } from './school-accountant.guard';

describe('SchoolAccountantGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolAccountantGuard]
    });
  });

  it('should ...', inject([SchoolAccountantGuard], (guard: SchoolAccountantGuard) => {
    expect(guard).toBeTruthy();
  }));
});
