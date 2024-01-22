import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakesOverTimeComponent } from './earthquakes-over-time.component';

describe('EarthquakesOverTimeComponent', () => {
  let component: EarthquakesOverTimeComponent;
  let fixture: ComponentFixture<EarthquakesOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthquakesOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarthquakesOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
