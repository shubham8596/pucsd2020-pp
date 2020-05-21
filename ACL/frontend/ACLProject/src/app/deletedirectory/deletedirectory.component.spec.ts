import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedirectoryComponent } from './deletedirectory.component';

describe('DeletedirectoryComponent', () => {
  let component: DeletedirectoryComponent;
  let fixture: ComponentFixture<DeletedirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
