import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AdventureCamps } from '../domain/model/adventure-camps.entity';
import { AdventureCampsResource } from './adventure-camps.resource';
import { AdventureCampsAssembler } from './adventure-camps.assembler';

export class AdventureCampsApiEndpoint extends BaseApiEndpoint<AdventureCamps, AdventureCampsResource> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformBaseApiUrl}${environment.adventureCampsEndpointPath}`,
      new AdventureCampsAssembler(),
    );
  }
}
