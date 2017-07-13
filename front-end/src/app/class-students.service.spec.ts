import { TestBed, inject } from '@angular/core/testing';

import { ClassStudentsService } from './class-students.service';

describe('ClassStudentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassStudentsService]
    });
  });

  it('should be created', inject([ClassStudentsService], (service: ClassStudentsService) => {
    expect(service).toBeTruthy();
  }));
});
