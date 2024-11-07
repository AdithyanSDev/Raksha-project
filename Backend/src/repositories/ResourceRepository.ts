import { Resource } from '../models/Resource';

class ResourceRepository {
  async createResource(resourceData: any) {
    const resource = new Resource(resourceData);
    return await resource.save();
  }

  async getAllResources() {
    return await Resource.find();
  }

  async updateResource(id: string, resourceData: any) {
    return await Resource.findByIdAndUpdate(id, resourceData, { new: true });
  }

  async deleteResource(id: string) {
    return await Resource.findByIdAndDelete(id);
  }
}

export default new ResourceRepository();
