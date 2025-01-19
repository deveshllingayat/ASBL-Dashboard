import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../extended-sidebar/extended-sidebar.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-fixed-side-bar',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './fixed-side-bar.component.html',
  styleUrl: './fixed-side-bar.component.scss',
})
export class FixedSideBarComponent {
  constructor(private auth: AuthService) {}

  nestedMenuOpen = signal(false);
  @Output() menuItemClicked = new EventEmitter<string>();

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'folder',
      label: 'Projects',
      route: 'projects',
    },
    {
      icon: 'public',
      label: 'Global',
      route: 'global',
    },
    {
      icon: 'pin_drop',
      label: 'Pinned',
      route: 'pinned',
    },
  ]);
  onMenuItemClick(route: string) {
    this.menuItemClicked.emit(route);
  }
  logout() {
    this.auth.logout();
  }
}
