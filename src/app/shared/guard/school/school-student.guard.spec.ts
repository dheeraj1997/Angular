import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolStudentGuard } from './school-student.guard';

describe('SchoolStudentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolStudentGuard]
    });
  });

  it('should ...', inject([SchoolStudentGuard], (guard: SchoolStudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
