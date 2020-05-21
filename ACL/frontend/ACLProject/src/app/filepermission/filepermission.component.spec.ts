import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepermissionComponent } from './filepermission.component';

describe('FilepermissionComponent', () => {
  let component: FilepermissionComponent;
  let fixture: ComponentFixture<FilepermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilepermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilepermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
