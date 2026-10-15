export interface CreateReservationRequest {
  adventureCampsId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
