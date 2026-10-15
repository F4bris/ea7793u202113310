import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationAssembler } from './reservation.assembler';
import { ReservationResource } from './reservation.resource';

export class ReservationsApiEndpoint extends BaseApiEndpoint<Reservation, ReservationResource> {
  private readonly reservationAssembler = new ReservationAssembler();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformBaseApiUrl}${environment.reservationsEndpointPath}`,
      new ReservationAssembler(),
    );
  }

  create(draft: ReservationDraft): Observable<Reservation> {
    const request = this.reservationAssembler.toRequestFromDraft(draft);
    return this.http
      .post<ReservationResource>(this.endpointUrl, request)
      .pipe(map((resource) => this.reservationAssembler.toEntityFromResource(resource)));
  }
}
