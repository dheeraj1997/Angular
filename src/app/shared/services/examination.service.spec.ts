import { TestBed, inject } from '@angular/core/testing';

import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExaminationService]
    });
  });

  it('should be created', inject([ExaminationService], (service: ExaminationService) => {
    expect(service).toBeTruthy();
  }));
});
