import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { SecretAdmin } from './secret-admin';
import Keycloak from 'keycloak-js';

const adminGuard = () => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);
  
  if (keycloak.authenticated && keycloak.hasRealmRole('admin')) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'secret-admin',
    component: SecretAdmin,
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
