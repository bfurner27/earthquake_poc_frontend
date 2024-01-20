import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  routerUrl: string = '';
  routeSubscription: Subscription;

  constructor(public router: Router) {
    // found code here https://stackoverflow.com/a/77418395 adapted it to my use case
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.routerUrl = router.url;
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }
}
