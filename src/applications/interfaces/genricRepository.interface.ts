import { FindOneOptions } from 'typeorm';

export interface IGenericRepository<TEntity, TModel> {
  save(T: TEntity): Promise<TEntity>;
  find(findOneOptions: FindOneOptions<TModel>): Promise<TEntity[]>;
  findOne(findOptions: FindOneOptions): Promise<TEntity | undefined>;
  findAll(): Promise<TEntity[]>;
}
