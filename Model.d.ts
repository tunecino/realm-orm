import RealmQuery from './libs/query'
import * as Realm from 'realm'

interface SearchOption  {
  stringFields?: string[]
  return?: boolean,
  limit?: number,
}

export interface ModelStatic<M> {
  schema: Realm.ObjectSchema
  all() : Realm.Results<M & Realm.Object>
  searchText(term: string, limit?: number): Realm.Results<M & Realm.Object>
  searchText(term: string, limit?: boolean): RealmQuery<M>
  searchText(term: string, options: SearchOption): Realm.Results<M & Realm.Object> | RealmQuery<M>
  find(id: number|string): M & Realm.Object
  query() : RealmQuery<M>
  insert(object: NonFunctionProperties<M> | NonFunctionProperties<M>[]): Promise<void>
  create(object: NonFunctionProperties<M> | NonFunctionProperties<M>[]): Promise<M>
  ids(): number[]
  delete(object: Realm.Results<M>| any ): Promise<void>
  transform(M): M
  syncObject(M): M

}
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof Partial<T>];
type NonFunctionProperties<T> = Pick<Partial<T>, NonFunctionPropertyNames<T>>;
export default class Model<M> extends Realm.Object {
  delete(): Promise<void>
  update(object : NonFunctionProperties<M>): Promise<void>
}
