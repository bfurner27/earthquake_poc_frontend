import { Component, inject } from '@angular/core';
import { EarthquakesService } from '../earthquakes.service';
import { Earthquake } from '../earthquake';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-earthquake-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earthquake-list.component.html',
  styleUrl: './earthquake-list.component.scss'
})
export class EarthquakeListComponent {
  private earthquakeService: EarthquakesService = inject(EarthquakesService)
  earthquakes: Array<string> = []

  constructor() {
    this.earthquakeService.subscribe().subscribe((data) => {
      this.earthquakes = data.map((e) => JSON.stringify(e));
    })
  }

  load_more() {
    this.earthquakeService.load_more()
  }
}
