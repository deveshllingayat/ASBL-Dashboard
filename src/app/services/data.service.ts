import { Injectable } from '@angular/core';
import { MenuItem } from '../layout/nav/extended-sidebar/extended-sidebar.component';
import { ProjectInfo } from '../pages/projects/projects.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private selectedProjectSubject = new BehaviorSubject<string>('');
  selectedProject$ = this.selectedProjectSubject.asObservable();

  _MenuItemsByTab: { [key: string]: MenuItem[] } = {
    projects: [
      {
        icon: 'dashboard',
        label: 'Dashboard',
        route: 'dashboard',
      },
      {
        icon: 'home',
        label: 'Home',
        route: 'home',
        subItems: [
          {
            label: 'Construction Planning',
            route: 'construction_planning',
          },
          {
            label: 'Logs & Issues',
            route: 'logs_issues',
          },
          {
            label: 'Team Management',
            route: 'team_management',
          },
          {
            label: 'Analytics',
            route: 'analytics',
          },
          {
            label: 'Quantity Management',
            route: 'quantity_management',
          },
          {
            label: 'Contract Management',
            route: 'contract_management',
          },
          {
            label: 'Material Management',
            route: 'material_management',
          },
          {
            label: 'Safety Management',
            route: 'safety_management',
          },
        ],
      },
      {
        icon: 'swap_horiz',
        label: 'Uploads & Downloads',
        route: 'uploads-downloads',
      },
      {
        icon: 'settings',
        label: 'Settings',
        route: 'settings',
      },
    ],
    global: [],
    pinned: [],
  };
  _Projects: ProjectInfo[] = [
    {
      image:
        'https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?t=st=1737286549~exp=1737290149~hmac=40ab438e239079e98e0e4e8218ebeb981b88a2362a9e1b02bb6e3d070d9e577e&w=996',
      title: 'PROJECT 1',
      desc: 'Mivan',
    },
    {
      image:
        'https://img.freepik.com/free-photo/mumbai-skyline-skyscrapers-construction_469504-21.jpg?ga=GA1.1.376129761.1723021957&semt=ais_hybrid',
      title: 'PROJECT 2',
      desc: 'Mivan',
    },
    {
      image:
        'https://img.freepik.com/free-photo/modern-business-center_1127-3152.jpg?ga=GA1.1.376129761.1723021957&semt=ais_hybrid',
      title: 'PROJECT 3',
      desc: 'Mivan',
    },
    {
      image:
        'https://img.freepik.com/free-photo/hotel_1127-4035.jpg?ga=GA1.1.376129761.1723021957&semt=ais_hybrid',
      title: 'PROJECT 4',
      desc: 'Mivan',
    },
  ];
  constructor() {}
  getMenuItems(route: string) {
    return this._MenuItemsByTab[route];
  }
  getAllProjects() {
    return this._Projects;
  }
  setSelectedProject(project: string) {
    this.selectedProjectSubject.next(project);
  }
  getSelectedProject(): string {
    return this.selectedProjectSubject.value;
  }
}
