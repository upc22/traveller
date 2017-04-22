import { TestBed, inject } from '@angular/core/testing';

import { NotesFetchService } from './notes-fetch.service';

describe('NotesFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesFetchService]
    });
  });

  it('should ...', inject([NotesFetchService], (service: NotesFetchService) => {
    expect(service).toBeTruthy();
  }));
});
