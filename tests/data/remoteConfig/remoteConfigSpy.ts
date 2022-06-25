import { GetRemoteConfig } from '~/data/remoteConfig';
import { GetStatusAddPlanRemoteConfigError } from '../../../src/data/errors';

export class RemoteConfigSpy implements GetRemoteConfig {
  private _param!: string;
  private result = false;
  private unexpectedErrorOccurred = false;

  async getConfig(param: string): Promise<any> {
    if (this.unexpectedErrorOccurred)
      throw new GetStatusAddPlanRemoteConfigError();
    this._param = param;
    return this.result;
  }

  get param(): string {
    return this._param;
  }

  completeWithStatus(status: boolean) {
    this.result = status;
  }

  completeWithUnexpectedError() {
    this.unexpectedErrorOccurred = true;
  }
}
