// src/repositories/ResourceRequestRepository.ts
import { IResourceRequest, ResourceRequest } from '../models/ResourceRequests';
import { BaseRepository } from './BaseRepository';

export class ResourceRequestRepository extends BaseRepository<IResourceRequest> {
  constructor() {
    super(ResourceRequest);
  }
  async updateStatusById(id: string, status: string, rejectionReason?: string) {
    const updateData: any = { status };
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    return await ResourceRequest.findByIdAndUpdate(id, updateData, { new: true });
  }
  
  async findByStatus(status: string) {
    return await ResourceRequest.find({ status });
  }
  
}
