import { Reservation } from './reservation.entity';
import { AdventureCamps} from './adventure-camps.entity';

export class AdventureCampsOccupancy {
  constructor(
    readonly adventureCamps: AdventureCamps,
    readonly reservations: Reservation[],
  ) {}

  get totalParticipants(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  get availableCapacity(): number {
    return this.adventureCamps.capacity - this.totalParticipants;
  }

  get isEmpty(): boolean {
    return this.reservations.length === 0;
  }
}
