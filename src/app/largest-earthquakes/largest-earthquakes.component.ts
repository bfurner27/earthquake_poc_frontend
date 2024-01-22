import { Component, Input, SimpleChanges } from '@angular/core';
import { EarthquakeExtendedWithCountry } from '../earthquakes.service';
import { CommonModule } from '@angular/common';
import { IsoToStandardPipe } from '../iso-to-standard.pipe';

@Component({
  selector: 'app-largest-earthquakes',
  standalone: true,
  imports: [CommonModule, IsoToStandardPipe],
  templateUrl: './largest-earthquakes.component.html',
  styleUrl: './largest-earthquakes.component.scss'
})
export class LargestEarthquakesComponent {
  @Input({ required: true }) largestEarthquakeList: Array<EarthquakeExtendedWithCountry> = []

  ngOnInit() { }
}
