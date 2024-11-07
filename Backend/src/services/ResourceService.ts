import ResourceRepository from '../repositories/ResourceRepository';

class ResourceService {
  async createResource(resourceData: any) {
    return await ResourceRepository.createResource(resourceData);
  }

  async getAllResources() {
    return await ResourceRepository.getAllResources();
  }

  async updateResource(id: string, resourceData: any) {
    return await ResourceRepository.updateResource(id, resourceData);
  }

  async deleteResource(id: string) {
    return await ResourceRepository.deleteResource(id);
  }
}

export default new ResourceService();
