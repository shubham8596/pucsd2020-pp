import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedirectoryComponent } from './updatedirectory.component';

describe('UpdatedirectoryComponent', () => {
  let component: UpdatedirectoryComponent;
  let fixture: ComponentFixture<UpdatedirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
