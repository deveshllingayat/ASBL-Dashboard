import { Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExtendedSidebarComponent } from './layout/nav/extended-sidebar/extended-sidebar.component';
import { FixedSideBarComponent } from './layout/nav/fixed-side-bar/fixed-side-bar.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    ExtendedSidebarComponent,
    FixedSideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? '0px' : '300px'));
  isAuthenticated: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
  }

  extendSidebar() {
    this.collapsed.set(false);
  }
}
