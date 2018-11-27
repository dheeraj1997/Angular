import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolTeacherGuard } from './school-teacher.guard';

describe('SchoolTeacherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolTeacherGuard]
    });
  });

  it('should ...', inject([SchoolTeacherGuard], (guard: SchoolTeacherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
