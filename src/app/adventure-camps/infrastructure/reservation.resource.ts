export interface ReservationResource {
  id: number;
  adventureCampsId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
