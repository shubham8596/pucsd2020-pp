import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserdetailsComponent } from './updateuserdetails.component';

describe('UpdateuserdetailsComponent', () => {
  let component: UpdateuserdetailsComponent;
  let fixture: ComponentFixture<UpdateuserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateuserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
