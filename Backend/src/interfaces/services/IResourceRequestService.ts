// src/interfaces/services/IResourceRequestService.ts
import { ResourceRequestDTO } from '../../dtos/ResourceRequestDTO';
import { IResourceRequest } from '../../models/ResourceRequests';

export interface IResourceRequestService {
  createResourceRequest(resourceRequestData: ResourceRequestDTO): Promise<IResourceRequest>;
  getAllResourceRequests(): Promise<IResourceRequest[]>;
  approveRequest(id: string): Promise<IResourceRequest | null>;
  rejectRequest(id: string, rejectionReason: string): Promise<IResourceRequest | null>;
  getRequestsByStatus(status: string): Promise<IResourceRequest[]>;
}
