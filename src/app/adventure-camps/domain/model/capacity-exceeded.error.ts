export class CapacityExceededError extends Error {
  constructor(readonly availableCapacity: number) {
    super(`The participants exceed the available capacity (${availableCapacity}).`);
    this.name = 'CapacityExceededError';
  }
}
