import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxToolbarModule, DxButtonModule } from 'devextreme-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxToolbarModule,
    DxButtonModule
  ],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
})
export class PrivateLayoutComponent {

  currentRoute = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goFavorites() {
    this.router.navigate(['/favorites']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isHome(): boolean {
    return this.currentRoute === '/';
  }

  isFavorites(): boolean {
    return this.currentRoute === '/favorites';
  }
}
