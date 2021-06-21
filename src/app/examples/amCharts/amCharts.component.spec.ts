import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmChartsComponent } from './amCharts.component';

describe('AmChartsComponent', () => {
  let component: AmChartsComponent;
  let fixture: ComponentFixture<AmChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
