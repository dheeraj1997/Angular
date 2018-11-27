import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolOtherGuard } from './school-other.guard';

describe('SchoolOtherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolOtherGuard]
    });
  });

  it('should ...', inject([SchoolOtherGuard], (guard: SchoolOtherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
