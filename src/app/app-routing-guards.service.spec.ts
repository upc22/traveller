import { TestBed, inject } from '@angular/core/testing';

import { AppRoutingGuardsService } from './app-routing-guards.service';

describe('AppRoutingGuardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRoutingGuardsService]
    });
  });

  it('should ...', inject([AppRoutingGuardsService], (service: AppRoutingGuardsService) => {
    expect(service).toBeTruthy();
  }));
});
