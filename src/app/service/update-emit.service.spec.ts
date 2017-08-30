import { TestBed, inject } from '@angular/core/testing';

import { UpdateEmitService } from './update-emit.service';

describe('UpdateEmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateEmitService]
    });
  });

  it('should be created', inject([UpdateEmitService], (service: UpdateEmitService) => {
    expect(service).toBeTruthy();
  }));
});
