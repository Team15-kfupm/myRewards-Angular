import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgesHistogramComponent } from './ages-histogram.component';

describe('AgesHistogramComponent', () => {
  let component: AgesHistogramComponent;
  let fixture: ComponentFixture<AgesHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgesHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgesHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
