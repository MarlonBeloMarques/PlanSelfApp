export interface GetRemoteConfig<R = any> {
  get(param: string): Promise<R>;
}
