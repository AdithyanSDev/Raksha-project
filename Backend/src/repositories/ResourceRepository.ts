import { IResourceRepository } from '../interfaces/repositories/IResourceRepository';
import { Resource, IResource } from '../models/Resource';
import { BaseRepository } from './BaseRepository';

class ResourceRepository extends BaseRepository<IResource> implements IResourceRepository {
  async createResource(resourceData: Partial<IResource>): Promise<IResource> {
    try {
      const resource = new Resource(resourceData);
      return await resource.save();
    } catch (error) {
      throw new Error('Error creating resource');
    }
  }

  async getAllResources(): Promise<IResource[]> {
    try {
      return await Resource.find();
    } catch (error) {
      throw new Error('Error fetching resources');
    }
  }

  async updateResource(id: string, resourceData: Partial<IResource>): Promise<IResource | null> {
    try {
      return await Resource.findByIdAndUpdate(id, resourceData, { new: true });
    } catch (error) {
      throw new Error('Error updating resource');
    }
  }

  async deleteResource(id: string): Promise<void> {
    try {
      await Resource.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting resource');
    }
  }
}

export default new ResourceRepository(Resource);
