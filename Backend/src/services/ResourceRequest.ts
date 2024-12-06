// src/services/ResourceRequestService.ts
import { ResourceRequestRepository } from '../repositories/ResourceRequest';
import { ResourceRequestDTO } from '../dtos/ResourceRequestDTO';
import mongoose from 'mongoose';

export class ResourceRequestService {
  private resourceRequestRepository: ResourceRequestRepository;

  constructor() {
    this.resourceRequestRepository = new ResourceRequestRepository();
  }

  async createResourceRequest(resourceRequestData: ResourceRequestDTO) {
    // Convert userId from string to Schema.Types.ObjectId
    const resourceRequest = {
      ...resourceRequestData,
      userId: new mongoose.Types.ObjectId(resourceRequestData.userId) as unknown as mongoose.Schema.Types.ObjectId,
    };

    return await this.resourceRequestRepository.create(resourceRequest);
  }

  async getAllResourceRequests() {
    return await this.resourceRequestRepository.findAll();
  }
  async approveRequest(id: string) {
    return await this.resourceRequestRepository.updateStatusById(id, 'approved');
  }
  
  async rejectRequest(id: string, rejectionReason: string) {
    return await this.resourceRequestRepository.updateStatusById(id, 'rejected', rejectionReason);
  }
  
  async getRequestsByStatus(status: string) {
    return await this.resourceRequestRepository.findByStatus(status);
  }
  
}
