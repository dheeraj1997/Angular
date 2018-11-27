import { TestBed, inject } from '@angular/core/testing';

import { GSettingsService } from './g-settings.service';

describe('GSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GSettingsService]
    });
  });

  it('should be created', inject([GSettingsService], (service: GSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
