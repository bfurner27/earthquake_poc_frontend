import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeItemComponent } from './earthquake-item.component';

describe('EarthquakeItemComponent', () => {
  let component: EarthquakeItemComponent;
  let fixture: ComponentFixture<EarthquakeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthquakeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarthquakeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
