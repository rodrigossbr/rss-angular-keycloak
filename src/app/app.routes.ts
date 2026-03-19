import {Routes} from '@angular/router';
import {Login} from './pages/login/login';
import {Home} from './pages/home/home';
import {authGuard, redirectGuard} from './core';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [redirectGuard]
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];
