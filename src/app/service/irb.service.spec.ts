import { TestBed, inject } from '@angular/core/testing';

import { IrbService } from './irb.service';

describe('IrbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrbService]
    });
  });

  it('should be created', inject([IrbService], (service: IrbService) => {
    expect(service).toBeTruthy();
  }));
});
