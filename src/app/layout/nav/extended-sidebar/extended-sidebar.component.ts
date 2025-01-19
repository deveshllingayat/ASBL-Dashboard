import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItemComponent } from '../../../components/menu-item/menu-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { ProjectInfo } from '../../../pages/projects/projects.component';
import { filter } from 'rxjs';

export type MenuItem = {
  icon?: string;
  label?: string;
  route?: string;
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MenuItemComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './extended-sidebar.component.html',
  styleUrl: './extended-sidebar.component.scss',
})
export class ExtendedSidebarComponent implements OnInit, OnChanges {
  constructor(private data: DataService, private router: Router) {}
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([]);

  allProjects: ProjectInfo[] = [];
  selectedProject: string = '';
  ngOnInit() {
    this.allProjects = this.data.getAllProjects();
    this.data.selectedProject$.subscribe((project) => {
      this.selectedProject = project;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateMenuItemsBasedOnRoute(event.urlAfterRedirects);
      });
  }
  updateMenuItemsBasedOnRoute(url: string) {
    const route = url.split('/')[1]; // Extract the first part of the URL path
    this.menuItems.set(this.data.getMenuItems(route));
  }
  onMenuItemChange(route: string) {
    this.menuItems.set(this.data.getMenuItems(route));
    this.sideNavCollapsed.set(false); // Open the extended side menu
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collapsed']) {
      this.updateMenuItemsBasedOnRoute(this.router.url);
    }
  }
}
