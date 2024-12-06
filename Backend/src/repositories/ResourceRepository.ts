import { Resource, IResource } from '../models/Resource';
import { BaseRepository } from './BaseRepository';

class ResourceRepository extends BaseRepository<IResource> {
  async createResource(resourceData:Partial<IResource>) {
    const resource = new Resource(resourceData);
    return await resource.save();
  }

  async getAllResources() {
    return await Resource.find();
  }

  async updateResource(id: string, resourceData: Partial<IResource>) {
    return await Resource.findByIdAndUpdate(id, resourceData, { new: true });
  }

  async deleteResource(id: string) {
    return await Resource.findByIdAndDelete(id);
  }
}

export default new  ResourceRepository(Resource);
