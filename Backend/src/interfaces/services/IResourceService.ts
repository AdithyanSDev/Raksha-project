import { ResourceDTO } from '../../dtos/ResourceDTO';

export interface IResourceService {
  createResource(resourceData: ResourceDTO): Promise<any>;
  getAllResources(): Promise<any>;
  updateResource(id: string, resourceData: Partial<ResourceDTO>): Promise<any>;
  deleteResource(id: string): Promise<void>;
}
