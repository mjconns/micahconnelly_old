import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgurComponent } from './imgur.component';

describe('ImgurComponent', () => {
  let component: ImgurComponent;
  let fixture: ComponentFixture<ImgurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
