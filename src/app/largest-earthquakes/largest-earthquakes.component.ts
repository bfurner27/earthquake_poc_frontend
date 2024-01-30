import { Component, Input, SimpleChanges } from '@angular/core';
import { EarthquakeExtendedWithCountry } from '../earthquakes.service';
import { CommonModule } from '@angular/common';
import { IsoToStandardPipe } from '../iso-to-standard.pipe';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";
import { IsoToStandardShortPipe } from "../iso-to-standard-short.pipe";

@Component({
  selector: 'app-largest-earthquakes',
  standalone: true,
  templateUrl: './largest-earthquakes.component.html',
  styleUrl: './largest-earthquakes.component.scss',
  imports: [CommonModule, IsoToStandardPipe, DashboardCardComponent, IsoToStandardShortPipe]
})
export class LargestEarthquakesComponent {
  @Input({ required: true }) largestEarthquakeList: Array<EarthquakeExtendedWithCountry> = []

  ngOnInit() { }
}
