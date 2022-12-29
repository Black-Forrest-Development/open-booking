import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCreateVisitorGroupComponent } from './booking-create-visitor-group.component';

describe('BookingCreateVisitorGroupComponent', () => {
  let component: BookingCreateVisitorGroupComponent;
  let fixture: ComponentFixture<BookingCreateVisitorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingCreateVisitorGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCreateVisitorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
