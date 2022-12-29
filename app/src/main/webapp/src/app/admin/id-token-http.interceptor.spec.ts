import { TestBed } from '@angular/core/testing';

import { IdTokenHttpInterceptor } from './id-token-http.interceptor';

describe('IdTokenHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IdTokenHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IdTokenHttpInterceptor = TestBed.inject(IdTokenHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
