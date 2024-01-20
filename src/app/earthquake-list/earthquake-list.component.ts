import { Component, inject } from '@angular/core';
import { EarthquakesService } from '../earthquakes.service';
import { Earthquake } from '../earthquake';
import { CommonModule } from '@angular/common';
import { EarthquakeItemComponent, EarthquakeUpdateEvent } from '../earthquake-item/earthquake-item.component';

@Component({
  selector: 'app-earthquake-list',
  standalone: true,
  imports: [CommonModule, EarthquakeItemComponent],
  templateUrl: './earthquake-list.component.html',
  styleUrl: './earthquake-list.component.scss'
})
export class EarthquakeListComponent {
  private earthquakeService: EarthquakesService = inject(EarthquakesService)
  earthquakes: Array<Earthquake> = []

  constructor() {
    this.earthquakeService.subscribe().subscribe((data) => {
      this.earthquakes = data;
    })
  }

  load_more() {
    this.earthquakeService.load_more()
  }

  handle_update(event: EarthquakeUpdateEvent) {
    this.earthquakeService.update_earthquake(event.new)
  }
}
