import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefilepermissionComponent } from './updatefilepermission.component';

describe('UpdatefilepermissionComponent', () => {
  let component: UpdatefilepermissionComponent;
  let fixture: ComponentFixture<UpdatefilepermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatefilepermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefilepermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
