import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ActivityType } from '../domain/model/activity-type';
import { AdventureCamps } from '../domain/model/adventure-camps.entity';
import { AdventureCampsResource } from './adventure-camps.resource';
import { AdventureCampsResponse } from './adventure-camps.response';

export class AdventureCampsAssembler implements BaseAssembler<AdventureCamps, AdventureCampsResource> {
  toEntityFromResource(resource: AdventureCampsResource): AdventureCamps {
    return new AdventureCamps(
      resource.id,
      resource.name,
      resource.activityType as ActivityType,
      resource.capacity,
      resource.latitude,
      resource.longitude,
    );
  }

  toEntitiesFromResponse(response: AdventureCampsResponse): AdventureCamps[] {
    return response.map((resource) => this.toEntityFromResource(resource));
  }
}
