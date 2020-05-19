import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetgroupComponent } from './getgroup.component';

describe('GetgroupComponent', () => {
  let component: GetgroupComponent;
  let fixture: ComponentFixture<GetgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
