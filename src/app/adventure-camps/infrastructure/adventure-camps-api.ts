import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationsApiEndpoint } from './reservations-api-endpoint';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';
import { AdventureCamps } from '../domain/model/adventure-camps.entity';
import { AdventureCampsApiEndpoint } from './adventure-camps-api-endpoint';

@Injectable({ providedIn: 'root' })
export class AdventureCampsApi {
  private readonly http = inject(HttpClient);
  private readonly adventureCampsEndpoint = new AdventureCampsApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getAdventureCamps(): Observable<AdventureCamps[]> {
    return this.adventureCampsEndpoint.getAll();
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  createReservation(draft: ReservationDraft): Observable<Reservation> {
    return this.reservationsEndpoint.create(draft);
  }
}
