export interface GetDatabase<R = any> {
  get(): Promise<R>;
}
