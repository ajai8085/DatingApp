/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorInterceprtorService } from './ErrorInterceprtor.service';

describe('Service: ErrorInterceprtor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorInterceprtorService]
    });
  });

  it('should ...', inject([ErrorInterceprtorService], (service: ErrorInterceprtorService) => {
    expect(service).toBeTruthy();
  }));
});
