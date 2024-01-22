import { Component } from '@angular/core';
import { CountriesService, TopEarthquakeCountry } from '../countries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-countries.component.html',
  styleUrl: './top-countries.component.scss'
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
