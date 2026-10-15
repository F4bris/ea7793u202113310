import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { PageNotFound } from './shared/presentation/views/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'home', component: Home, title: 'Home' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Page Not Found' },
];
