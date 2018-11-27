import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolRegistrarGuard } from './school-registrar.guard';

describe('SchoolRegistrarGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolRegistrarGuard]
    });
  });

  it('should ...', inject([SchoolRegistrarGuard], (guard: SchoolRegistrarGuard) => {
    expect(guard).toBeTruthy();
  }));
});
