// src/repositories/ResourceRequestRepository.ts
import { IResourceRequest, ResourceRequest } from '../models/ResourceRequests';
import { BaseRepository } from './BaseRepository';
import { IResourceRequestRepository } from '../interfaces/repositories/IResourceRequestRepository';

export class ResourceRequestRepository extends BaseRepository<IResourceRequest> implements IResourceRequestRepository {
  constructor() {
    super(ResourceRequest);
  }

  async updateStatusById(id: string, status: string, rejectionReason?: string): Promise<IResourceRequest | null> {
    try {
      const updateData: any = { status };
      if (status === 'rejected' && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
      }
      return await ResourceRequest.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error:any) {
      throw new Error('Failed to update resource request status: ' + error.message);
    }
  }

  async findByStatus(status: string): Promise<IResourceRequest[]> {
    try {
      return await ResourceRequest.find({ status });
    } catch (error:any) {
      throw new Error('Failed to fetch resource requests by status: ' + error.message);
    }
  }
}
