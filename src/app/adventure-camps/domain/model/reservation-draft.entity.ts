import { ActivityType } from './activity-type';

export class ReservationDraft {
  constructor(
    readonly adventureCampsId: number,
    readonly activityType: ActivityType,
    readonly participantName: string,
    readonly participants: number,
    readonly weatherTemperature: number,
    readonly reservedAt: Date,
  ) {}
}
