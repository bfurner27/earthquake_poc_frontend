import { Component } from '@angular/core';
import { CountriesService, TopEarthquakeCountry } from '../countries.service';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

@Component({
  selector: 'app-top-countries',
  standalone: true,
  templateUrl: './top-countries.component.html',
  styleUrl: './top-countries.component.scss',
  imports: [CommonModule, DashboardCardComponent]
})
export class TopCountriesComponent {
  data: Array<TopEarthquakeCountry> = [];
  isLoading: boolean = true;

  constructor(private countriesService: CountriesService) {
    countriesService.get_most_earthquakes().subscribe((data) => {
      this.data = data.data.slice(0, 10);
      this.isLoading = false;
    })
  }
}
