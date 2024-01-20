import { Component, inject } from '@angular/core';
import { EarthquakesService } from '../earthquakes.service';
import { Earthquake } from '../earthquake';
import { CommonModule } from '@angular/common';
import { EarthquakeItemComponent, EarthquakeUpdateEvent, EarthuqakeDeleteEvent } from '../earthquake-item/earthquake-item.component';

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
  isEditRow: boolean = false;
  now: Date = new Date();
  defaultEarthquake: Earthquake = {
    date: `${this.now.toISOString().substring(0, 10)}T12:00:00Z`,
    magnitude: 0,
    providerId: '',
    depth: undefined,
    type: undefined,
    latitude: 0,
    longitude: 0,
    id: 0
  }

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

  handleAddEarthquake(event: Event) {
    this.isEditRow = true;

    event.stopPropagation();
  }

  handle_create(event: EarthquakeUpdateEvent) {
    const newEntry = event.new;
    this.earthquakeService.create_earthquake({
      date: newEntry.date,
      depth: newEntry.depth,
      magnitude: newEntry.magnitude,
      type: newEntry.type,
      latitude: newEntry.latitude,
      longitude: newEntry.longitude,
    });

    this.isEditRow = false;
  }

  handle_delete(event: EarthuqakeDeleteEvent) {
    if (event.type === 'discard') {
      this.isEditRow = false;
    } else if (event.type === 'delete' && event.id !== undefined) {
      this.earthquakeService.delete_earthquake(event.id)
    }
  }
}
