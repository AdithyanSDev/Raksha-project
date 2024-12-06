import ResourceRepository from '../repositories/ResourceRepository';
import { ResourceDTO } from '../dtos/ResourceDTO';

class ResourceService {
  async createResource(resourceData: ResourceDTO) {
    return await ResourceRepository.createResource(resourceData);
  }

  async getAllResources() {
    return await ResourceRepository.getAllResources();
  }

  async updateResource(id: string, resourceData: Partial<ResourceDTO>) {
    return await ResourceRepository.updateResource(id, resourceData);
  }

  async deleteResource(id: string) {
    return await ResourceRepository.deleteResource(id);
  }
}

export default new ResourceService();
