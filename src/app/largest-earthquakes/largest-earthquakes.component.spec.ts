import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargestEarthquakesComponent } from './largest-earthquakes.component';

describe('LargestEarthquakesComponent', () => {
  let component: LargestEarthquakesComponent;
  let fixture: ComponentFixture<LargestEarthquakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargestEarthquakesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargestEarthquakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
