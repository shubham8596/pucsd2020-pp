import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderpermissionComponent } from './folderpermission.component';

describe('FolderpermissionComponent', () => {
  let component: FolderpermissionComponent;
  let fixture: ComponentFixture<FolderpermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderpermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
