import { TestBed, inject } from '@angular/core/testing';
import { NotesService } from 'app/user/services/notes.service';


describe('NotesFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService]
    });
  });

  it('should ...', inject([NotesService], (service: NotesService) => {
    expect(service).toBeTruthy();
  }));
});
