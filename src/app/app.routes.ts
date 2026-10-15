import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { PageNotFound } from './shared/presentation/views/page-not-found/page-not-found';
import { adventureCampsRoutes } from './adventure-camps/presentation/adventure-camps.routes';

export const routes: Routes = [
  { path: 'home', component: Home, title: 'Home' },
  { path: 'reservations', children: adventureCampsRoutes },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Page Not Found' },
];
