import { GetStatusAddPlan } from '~/domain/useCases';
import { GetRemoteConfig } from '../remoteConfig';

export class getStatusAddPlanRemoteConfig implements GetStatusAddPlan {
  constructor(private readonly getRemoteConfig: GetRemoteConfig) {}

  async get(param: string): Promise<boolean> {
    try {
      const result = await this.getRemoteConfig.getConfig(param);
      return result;
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super();
    this.message =
      'Unexpected error. Please check your internet and try again.';
    this.name = 'UnexpectedError';
  }
}
