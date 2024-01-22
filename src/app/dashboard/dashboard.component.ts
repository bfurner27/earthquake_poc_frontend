import { Component } from '@angular/core';
import { TopCountriesComponent } from '../top-countries/top-countries.component';
import { EarthquakesOverTimeComponent } from '../earthquakes-over-time/earthquakes-over-time.component';
import { LargestEarthquakesComponent } from '../largest-earthquakes/largest-earthquakes.component';
import { EarthquakeCountByYear, EarthquakeExtendedWithCountry, EarthquakesService } from '../earthquakes.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopCountriesComponent, EarthquakesOverTimeComponent, LargestEarthquakesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  largestEarthquakeList: Array<EarthquakeExtendedWithCountry> = []
  earthquakeCountByYear: Array<EarthquakeCountByYear> = []

  constructor(private earthquakeService: EarthquakesService) {

    earthquakeService.get_earthquake_statistics().subscribe((data) => {
      const defaultVal = { topFiveByMagnitude: [], countByYear: [] };
      const entry = Array.isArray(data.data) && data.data[0] !== undefined ? data.data[0] : defaultVal;
      this.largestEarthquakeList = entry.topFiveByMagnitude ?? [];
      this.earthquakeCountByYear = entry.countByYear ?? [];
    });
  }
}
