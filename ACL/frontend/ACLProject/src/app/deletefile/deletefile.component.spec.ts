import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletefileComponent } from './deletefile.component';

describe('DeletefileComponent', () => {
  let component: DeletefileComponent;
  let fixture: ComponentFixture<DeletefileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletefileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
