import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config';
import { GetDatabase } from '~/data/database';
import { GetRemoteConfig } from '~/data/remoteConfig';

export default class FirebaseAdapter
  implements GetRemoteConfig<boolean>, GetDatabase
{
  constructor(
    readonly remoteConfig: FirebaseRemoteConfigTypes.Module,
    readonly databaseReference: FirebaseDatabaseTypes.Reference,
  ) {}

  static convertToPath(reference: GetDatabase.Reference) {
    let path = '';
    Object.entries(reference).forEach((line) => {
      path += `${line[1]}/`;
    });

    return path;
  }

  async startConfigDefault(): Promise<void> {
    await this.startRemoteConfigDefault();
  }

  async getConfig(param: string) {
    const value = this.remoteConfig.getValue(param);
    return value.asBoolean();
  }

  async getData(): Promise<any | undefined> {
    const snapshot = await this.databaseReference.once('value');
    return snapshot.val();
  }

  private async startRemoteConfigDefault(): Promise<void> {
    await this.remoteConfig.setDefaults({
      addPlan: true,
    });
  }

  async fetchAndActivate(): Promise<boolean> {
    return await this.remoteConfig.fetchAndActivate();
  }
}
