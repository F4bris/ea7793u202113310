import { Routes } from '@angular/router';
import { NewReservation } from './views/new-reservation/new-reservation';

export const adventureCampsRoutes: Routes = [
  { path: 'new', component: NewReservation, title: 'New Reservation' },
];
