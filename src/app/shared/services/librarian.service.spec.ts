import { TestBed, inject } from '@angular/core/testing';

import { LibrarianService } from './librarian.service';

describe('LibrarianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibrarianService]
    });
  });

  it('should be created', inject([LibrarianService], (service: LibrarianService) => {
    expect(service).toBeTruthy();
  }));
});
