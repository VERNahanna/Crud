import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFAQComponent } from './edit-faq.component';

describe('EditFAQComponent', () => {
  let component: EditFAQComponent;
  let fixture: ComponentFixture<EditFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFAQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
