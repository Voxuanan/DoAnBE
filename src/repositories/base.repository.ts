import { IBaseRepository } from '@/interfaces/baseRepository.interface';
import { Model } from 'mongoose';

export default class BaseRepository<T> implements IBaseRepository<T> {
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
}
