export interface GetRemoteConfig<R = any> {
  getConfig(param: string): Promise<R>;
}
