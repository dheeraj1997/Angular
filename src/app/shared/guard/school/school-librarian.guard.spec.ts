import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolLibrarianGuard } from './school-librarian.guard';

describe('SchoolLibrarianGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolLibrarianGuard]
    });
  });

  it('should ...', inject([SchoolLibrarianGuard], (guard: SchoolLibrarianGuard) => {
    expect(guard).toBeTruthy();
  }));
});
