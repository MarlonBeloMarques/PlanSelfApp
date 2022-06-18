export interface GetDatabase<R = any> {
  get(reference: GetDatabase.Reference): Promise<R>;
}

export namespace GetDatabase {
  export type Reference = {
    user: User;
  };
  type User = {
    myPlans: string;
  };
}
