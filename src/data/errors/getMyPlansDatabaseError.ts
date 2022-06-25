export class GetMyPlansDatabaseError extends Error {
  constructor() {
    super();
    this.message =
      'An error occurred while trying to get your plans. Try again later.';
    this.name = 'GetMyPlansDatabaseError';
  }
}
