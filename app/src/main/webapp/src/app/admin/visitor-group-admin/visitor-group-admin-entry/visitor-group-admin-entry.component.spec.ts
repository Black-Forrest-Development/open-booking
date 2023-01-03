import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorGroupAdminEntryComponent } from './visitor-group-admin-entry.component';

describe('VisitorGroupAdminEntryComponent', () => {
  let component: VisitorGroupAdminEntryComponent;
  let fixture: ComponentFixture<VisitorGroupAdminEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorGroupAdminEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorGroupAdminEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
