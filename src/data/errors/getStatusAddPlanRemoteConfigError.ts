export class GetStatusAddPlanRemoteConfigError extends Error {
  constructor() {
    super();
    this.message =
      'Unexpected error. Please check your internet and try again.';
    this.name = 'GetStatusAddPlanRemoteConfigError';
  }
}
