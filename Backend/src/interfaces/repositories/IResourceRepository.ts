import { IResource } from '../../models/Resource';

export interface IResourceRepository {
  createResource(resourceData: Partial<IResource>): Promise<IResource>;
  getAllResources(): Promise<IResource[]>;
  updateResource(id: string, resourceData: Partial<IResource>): Promise<IResource | null>;
  deleteResource(id: string): Promise<void>;
}
