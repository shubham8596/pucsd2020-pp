import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSkillandToolsUsedComponent } from './technical-skilland-tools-used.component';

describe('TechnicalSkillandToolsUsedComponent', () => {
  let component: TechnicalSkillandToolsUsedComponent;
  let fixture: ComponentFixture<TechnicalSkillandToolsUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalSkillandToolsUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSkillandToolsUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
