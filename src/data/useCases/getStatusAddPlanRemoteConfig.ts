import { GetStatusAddPlan } from '~/domain/useCases';
import { GetRemoteConfig } from '../remoteConfig';

export class getStatusAddPlanRemoteConfig implements GetStatusAddPlan {
  constructor(private readonly getRemoteConfig: GetRemoteConfig) {}

  async get(param: string): Promise<boolean> {
    this.getRemoteConfig.get(param);
    return true;
  }
}
