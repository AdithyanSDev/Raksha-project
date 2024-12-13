import { IResourceService } from '../interfaces/services/IResourceService';
import { ResourceDTO } from '../dtos/ResourceDTO';
import ResourceRepository from '../repositories/ResourceRepository';

class ResourceService implements IResourceService {
  async createResource(resourceData: ResourceDTO): Promise<any> {
    try {
      return await ResourceRepository.createResource(resourceData);
    } catch (error) {
      throw new Error('Error creating resource');
    }
  }

  async getAllResources(): Promise<any> {
    try {
      return await ResourceRepository.getAllResources();
    } catch (error) {
      throw new Error('Error fetching resources');
    }
  }

  async updateResource(id: string, resourceData: Partial<ResourceDTO>): Promise<any> {
    try {
      return await ResourceRepository.updateResource(id, resourceData);
    } catch (error) {
      throw new Error('Error updating resource');
    }
  }

  async deleteResource(id: string): Promise<void> {
    try {
      await ResourceRepository.deleteResource(id);
    } catch (error) {
      throw new Error('Error deleting resource');
    }
  }
}

export default new ResourceService();
