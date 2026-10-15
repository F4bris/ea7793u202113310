export interface BaseAssembler<TEntity, TResource> {
  toEntityFromResource(resource: TResource): TEntity;
  toEntitiesFromResponse(response: TResource[]): TEntity[];
}
