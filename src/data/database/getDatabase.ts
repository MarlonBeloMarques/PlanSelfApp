export interface GetDatabase<R = any> {
  getData(reference: GetDatabase.Reference): Promise<R>;
}

export namespace GetDatabase {
  export type Reference = GenericObject;
  type GenericObject = { [key: string]: any };
}
