import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EarthquakeCountByYear } from '../earthquakes.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-earthquakes-over-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earthquakes-over-time.component.html',
  styleUrl: './earthquakes-over-time.component.scss'
})
export class EarthquakesOverTimeComponent {
  @Input({ required: true }) earthquakeCountByYear: Array<EarthquakeCountByYear> = []
  @ViewChild('graphDiv') graphDiv!: ElementRef;
}
