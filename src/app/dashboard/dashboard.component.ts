import { Component } from '@angular/core';
import { TopCountriesComponent } from '../top-countries/top-countries.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopCountriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
