import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseAssembler } from './base-assembler';

export abstract class BaseApiEndpoint<TEntity, TResource> {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: BaseAssembler<TEntity, TResource>,
  ) {}

  getAll(): Observable<TEntity[]> {
    return this.http
      .get<TResource[]>(this.endpointUrl)
      .pipe(map((response) => this.assembler.toEntitiesFromResponse(response)));
  }
}
