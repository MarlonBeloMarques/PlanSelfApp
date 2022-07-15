import { GetStatusAddPlan } from '~/domain/useCases';
import { GetStatusAddPlanRemoteConfigError } from '../errors';
import { GetRemoteConfig } from '../remoteConfig';

export class GetStatusAddPlanRemoteConfig implements GetStatusAddPlan {
  constructor(private readonly getRemoteConfig: GetRemoteConfig) {}

  async get(param: string): Promise<boolean> {
    try {
      const result = await this.getRemoteConfig.getConfig(param);
      return result;
    } catch (error) {
      throw new GetStatusAddPlanRemoteConfigError();
    }
  }
}
