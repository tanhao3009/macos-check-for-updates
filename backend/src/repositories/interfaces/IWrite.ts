export interface IWrite<T> {
  create(item: any): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;

  save(item?: T, callback?: (err: any) => void): Promise<boolean>;
}