import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemetricsComponent } from './battlemetrics.component';

describe('BattlemetricsComponent', () => {
  let component: BattlemetricsComponent;
  let fixture: ComponentFixture<BattlemetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
