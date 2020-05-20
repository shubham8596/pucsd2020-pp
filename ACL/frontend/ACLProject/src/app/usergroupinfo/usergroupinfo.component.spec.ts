import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupinfoComponent } from './usergroupinfo.component';

describe('UsergroupinfoComponent', () => {
  let component: UsergroupinfoComponent;
  let fixture: ComponentFixture<UsergroupinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
