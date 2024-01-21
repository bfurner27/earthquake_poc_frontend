import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-top-countries',
  standalone: true,
  imports: [],
  templateUrl: './top-countries.component.html',
  styleUrl: './top-countries.component.scss'
})
export class TopCountriesComponent {
  data_dump: string = '';

  constructor(private countriesService: CountriesService) {
    countriesService.get_most_earthquakes().subscribe((data) => {
      console.error("RECEIVED THE DATA", data)
      this.data_dump = JSON.stringify(data.data, null, 2);
    })
  }
}
