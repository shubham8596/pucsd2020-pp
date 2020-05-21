import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdirectoryComponent } from './getdirectory.component';

describe('GetdirectoryComponent', () => {
  let component: GetdirectoryComponent;
  let fixture: ComponentFixture<GetdirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
