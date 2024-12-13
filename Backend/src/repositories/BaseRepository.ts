// src/repositories/BaseRepository.ts
import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>; // Changed from private to protected

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error:any) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error:any) {
      throw new Error(`Error fetching all documents: ${error.message}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error:any) {
      throw new Error(`Error fetching document by ID: ${error.message}`);
    }
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error:any) {
      throw new Error(`Error updating document by ID: ${error.message}`);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error:any) {
      throw new Error(`Error deleting document by ID: ${error.message}`);
    }
  }
}
