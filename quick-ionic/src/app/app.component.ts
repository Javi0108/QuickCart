import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentMenu?: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentMenu();
      }
    });
  }

  private updateCurrentMenu() {
    const childRoute = this.route.firstChild;
    if (childRoute && childRoute.snapshot.data && childRoute.snapshot.data['menu']) {
      this.currentMenu = childRoute.snapshot.data['menu'];
    } else {
      this.currentMenu = 'default';
    }
  }
}
