import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveClassComponent } from './leave-class.component';

describe('LeaveClassComponent', () => {
  let component: LeaveClassComponent;
  let fixture: ComponentFixture<LeaveClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
