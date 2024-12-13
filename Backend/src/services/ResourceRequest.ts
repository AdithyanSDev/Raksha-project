// src/services/ResourceRequestService.ts
import { ResourceRequestRepository } from '../repositories/ResourceRequest';
import { ResourceRequestDTO } from '../dtos/ResourceRequestDTO';
import mongoose from 'mongoose';
import { IResourceRequestService } from '../interfaces/services/IResourceRequestService';
import { IResourceRequest } from '../models/ResourceRequests';

export class ResourceRequestService implements IResourceRequestService {
  private resourceRequestRepository: ResourceRequestRepository;

  constructor() {
    this.resourceRequestRepository = new ResourceRequestRepository();
  }

  async createResourceRequest(resourceRequestData: ResourceRequestDTO): Promise<IResourceRequest> {
    try {
      const resourceRequest = {
        ...resourceRequestData,
        userId: new mongoose.Types.ObjectId(resourceRequestData.userId) as unknown as mongoose.Schema.Types.ObjectId,
      };
      return await this.resourceRequestRepository.create(resourceRequest);
    } catch (error:any) {
      throw new Error('Failed to create resource request: ' + error.message);
    }
  }

  async getAllResourceRequests(): Promise<IResourceRequest[]> {
    try {
      return await this.resourceRequestRepository.findAll();
    } catch (error:any) {
      throw new Error('Failed to fetch resource requests: ' + error.message);
    }
  }

  async approveRequest(id: string): Promise<IResourceRequest | null> {
    try {
      return await this.resourceRequestRepository.updateStatusById(id, 'approved');
    } catch (error:any) {
      throw new Error('Failed to approve resource request: ' + error.message);
    }
  }

  async rejectRequest(id: string, rejectionReason: string): Promise<IResourceRequest | null> {
    try {
      return await this.resourceRequestRepository.updateStatusById(id, 'rejected', rejectionReason);
    } catch (error:any) {
      throw new Error('Failed to reject resource request: ' + error.message);
    }
  }

  async getRequestsByStatus(status: string): Promise<IResourceRequest[]> {
    try {
      return await this.resourceRequestRepository.findByStatus(status);
    } catch (error:any) {
      throw new Error('Failed to fetch resource requests by status: ' + error.message);
    }
  }
}
