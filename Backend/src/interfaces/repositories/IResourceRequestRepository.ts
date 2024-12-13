// src/interfaces/repositories/IResourceRequestRepository.ts
import { IResourceRequest } from '../../models/ResourceRequests';

export interface IResourceRequestRepository {
  create(data: Partial<IResourceRequest>): Promise<IResourceRequest>;
  findAll(): Promise<IResourceRequest[]>;
  updateStatusById(id: string, status: string, rejectionReason?: string): Promise<IResourceRequest | null>;
  findByStatus(status: string): Promise<IResourceRequest[]>;
}
