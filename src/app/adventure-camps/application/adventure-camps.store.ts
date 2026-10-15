import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, Observable, switchMap, tap, throwError } from 'rxjs';
import { ActivityType } from '../domain/model/activity-type';
import { CapacityExceededError } from '../domain/model/capacity-exceeded.error';
import { ReservationDraft } from '../domain/model/reservation-draft.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { AdventureCampsApi } from '../infrastructure/adventure-camps-api';
import { AdventureCamps } from '../domain/model/adventure-camps.entity';
import { AdventureCampsOccupancy } from '../domain/model/adventure-camps-occupancy.entity';

export interface NewReservationValues {
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
}


@Injectable({ providedIn: 'root' })
export class AdventureCampsStore {
  private readonly api = inject(AdventureCampsApi);

  private readonly adventureCampsSignal = signal<AdventureCamps[]>([]);
  private readonly reservationsSignal = signal<Reservation[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);

  readonly adventureCamps = this.adventureCampsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly occupancies = computed(() =>
    this.adventureCampsSignal().map(
      (adventureCamps) =>
        new AdventureCampsOccupancy(
          adventureCamps,
          this.reservationsSignal().filter(
            (reservation) => reservation.adventureCampId === adventureCamps.id,
          ),
        ),
    ),
  );

  loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(false);
    forkJoin({
      adventureCamps: this.api.getAdventureCamps(),
      reservations: this.api.getReservations(),
    }).subscribe({
      next: ({ adventureCamps, reservations }) => {
        this.adventureCampsSignal.set(adventureCamps);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set(true);
        this.loadingSignal.set(false);
      },
    });
  }

  findAdventureCampsByActivityType(activityType: ActivityType): AdventureCamps | undefined {
    return this.adventureCampsSignal().find(
      (adventureCamps) => adventureCamps.activityType === activityType,
    );
  }

  createReservation(values: NewReservationValues): Observable<Reservation> {
    const adventureCamps = this.findAdventureCampsByActivityType(values.activityType);
    if (!adventureCamps) {
      return throwError(
        () => new Error(`No adventure camps found for the activity type ${values.activityType}.`),
      );
    }
    if (values.participants < 1) {
      return throwError(() => new Error('The participants must be greater than zero.'));
    }

    return this.api.getReservations().pipe(
      tap((reservations) => this.reservationsSignal.set(reservations)),
      switchMap((reservations) => {
        const occupancy = new AdventureCampsOccupancy(
          adventureCamps,
          reservations.filter((reservation) => reservation.adventureCampId === adventureCamps.id),
        );
        if (values.participants > occupancy.availableCapacity) {
          return throwError(() => new CapacityExceededError(occupancy.availableCapacity));
        }
        const draft = new ReservationDraft(
          adventureCamps.id,
          values.activityType,
          values.participantName,
          values.participants,
          values.weatherTemperature,
          new Date(),
        );
        return this.api.createReservation(draft);
      }),
      tap((reservation) =>
        this.reservationsSignal.update((reservations) => [...reservations, reservation]),
      ),
    );
  }
}
