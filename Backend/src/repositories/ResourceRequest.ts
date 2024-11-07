// src/repositories/ResourceRequestRepository.ts

import { ResourceRequest } from '../models/ResourceRequests';
import { IResourceRequest } from '../models/ResourceRequests';

export class ResourceRequestRepository {
  // Method to create a new resource request
  async createResourceRequest(resourceRequestData: IResourceRequest): Promise<IResourceRequest> {
    const resourceRequest = new ResourceRequest(resourceRequestData);
    return await resourceRequest.save(); // Save the request to the database
  }

  public async findAll(): Promise<IResourceRequest[]> {
    try {
      return await ResourceRequest.find();
    } catch (error) {
      throw new Error('Error fetching resource requests');
    }
  }
 
}
