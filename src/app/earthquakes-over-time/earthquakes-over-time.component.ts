import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EarthquakeCountByYear } from '../earthquakes.service';

import { CommonModule } from '@angular/common';
import { Coordinate, LineChartComponent } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-earthquakes-over-time',
  standalone: true,
  imports: [CommonModule, LineChartComponent],
  templateUrl: './earthquakes-over-time.component.html',
  styleUrl: './earthquakes-over-time.component.scss'
})
export class EarthquakesOverTimeComponent {
  @Input({ required: true }) earthquakeCountByYear: Array<EarthquakeCountByYear> = []
  @ViewChild('graphDiv') graphDiv!: ElementRef;

  coordinates: Array<Coordinate> = []

  constructor() { }

  ngOnInit() {
    this.convertToCoordinates()
  }

  convertToCoordinates() {
    this.coordinates = this.earthquakeCountByYear.map((o) => {
      return {
        x: o.year,
        y: o.count,
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.convertToCoordinates()
  }
}
