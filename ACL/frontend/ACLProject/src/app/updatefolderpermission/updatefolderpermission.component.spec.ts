import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefolderpermissionComponent } from './updatefolderpermission.component';

describe('UpdatefolderpermissionComponent', () => {
  let component: UpdatefolderpermissionComponent;
  let fixture: ComponentFixture<UpdatefolderpermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatefolderpermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefolderpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
