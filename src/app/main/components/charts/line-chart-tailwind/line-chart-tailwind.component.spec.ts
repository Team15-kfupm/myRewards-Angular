import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTailwindComponent } from './line-chart-tailwind.component';

describe('LineChartTailwindComponent', () => {
  let component: LineChartTailwindComponent;
  let fixture: ComponentFixture<LineChartTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartTailwindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
