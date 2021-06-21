import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapExampleComponent } from './map-example.component';

describe('MapExampleComponent', () => {
  let component: MapExampleComponent;
  let fixture: ComponentFixture<MapExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
