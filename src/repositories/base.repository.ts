import { IBaseRepository } from '@/interfaces/baseRepository.interface';
import { Model, FilterQuery, PaginateOptions, Document, PaginateModel } from 'mongoose';

type DynamicModel<T extends Document> = PaginateModel<T>;
type DynamicAggregatePaginateModel<T extends Document> = PaginateModel<T>;

export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: any): Promise<T | any> {
    const model = new this.model(data);
    return model.save();
  }

  async update(id: string, data: any): Promise<T | null> {
    const options = { new: true };
    return this.model.findByIdAndUpdate(id, data, options).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async findPaginate(filter: FilterQuery<T>, options?: PaginateOptions): Promise<any> {
    const dynamicModel: DynamicModel<T> = this.model as DynamicModel<T>;
    const result = await dynamicModel.paginate(filter, options);
    return {
      data: result.docs,
      page: {
        pageCount: result.totalPages,
        itemCount: result.totalDocs,
        currentPage: result.page,
      },
    };
  }
}
