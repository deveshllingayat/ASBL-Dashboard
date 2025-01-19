import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/projects/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/projects/home/home.component').then(
            (m) => m.HomeComponent
          ),
        canActivate: [AuthGuard],

        children: [
          {
            path: 'construction_planning',
            loadComponent: () =>
              import(
                './pages/projects/home/construction-planning/construction-planning.component'
              ).then((m) => m.ConstructionPlanningComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'logs_issues',
            loadComponent: () =>
              import(
                './pages/projects/home/logs-issues/logs-issues.component'
              ).then((m) => m.LogsIssuesComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'team_management',
            loadComponent: () =>
              import(
                './pages/projects/home/team-management/team-management.component'
              ).then((m) => m.TeamManagementComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'analytics',
            loadComponent: () =>
              import(
                './pages/projects/home/analytics/analytics.component'
              ).then((m) => m.AnalyticsComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'quantity_management',
            loadComponent: () =>
              import(
                './pages/projects/home/quantity-management/quantity-management.component'
              ).then((m) => m.QuantityManagementComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'contract_management',
            loadComponent: () =>
              import(
                './pages/projects/home/contract-management/contract-management.component'
              ).then((m) => m.ContractManagementComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'material_management',
            loadComponent: () =>
              import(
                './pages/projects/home/material-management/material-management.component'
              ).then((m) => m.MaterialManagementComponent),
            canActivate: [AuthGuard],
          },
          {
            path: 'safety_management',
            loadComponent: () =>
              import(
                './pages/projects/home/safety-management/safety-management.component'
              ).then((m) => m.SafetyManagementComponent),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'uploads-downloads',
        loadComponent: () =>
          import(
            './pages/projects/uploads-downloads/uploads-downloads.component'
          ).then((m) => m.UploadsDownloadsComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/projects/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'global',
    loadComponent: () =>
      import('./pages/global/global.component').then((m) => m.GlobalComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pinned',
    loadComponent: () =>
      import('./pages/pinned/pinned.component').then((m) => m.PinnedComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
