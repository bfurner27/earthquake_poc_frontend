import { Routes } from '@angular/router';
import { EarthquakeListComponent } from './earthquake-list/earthquake-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Dashboard page',
        component: DashboardComponent
    },
    {
        path: 'earthquake-list',
        title: 'Earthquake list page',
        component: EarthquakeListComponent,
    },
];
