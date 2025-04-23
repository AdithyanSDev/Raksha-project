// src/controllers/ResourceRequestController.ts
import { Request, Response } from 'express';
import { ResourceRequestService } from '../services/ResourceRequest';
import { handleError } from '../utils/ErrorHandler';
import { IResourceRequestController } from '../interfaces/controllers/IResourceRequestController';

export class ResourceRequestController implements IResourceRequestController {
  private resourceRequestService: ResourceRequestService;

  constructor() {
    this.resourceRequestService = new ResourceRequestService();
  }

  async createResourceRequest(req: Request, res: Response): Promise<void> {
    try {
      console.log("hello",req.body)
      const resourceRequest = await this.resourceRequestService.createResourceRequest(req.body);
      console.log(resourceRequest)
      res.status(201).json(resourceRequest);
    } catch (error) {
      handleError(res, 'Failed to create resource request', error);
    }
  }

  async getAllResourceRequests(req: Request, res: Response): Promise<void> {
    try {
      const resourceRequests = await this.resourceRequestService.getAllResourceRequests();
      res.status(200).json(resourceRequests);
    } catch (error) {
      handleError(res, 'Failed to fetch resource requests', error);
    }
  }

  async approveRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedRequest = await this.resourceRequestService.approveRequest(id);
      res.status(200).json(updatedRequest);
    } catch (error) {
      handleError(res, 'Failed to approve resource request', error);
    }
  }

  async rejectRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;
      const updatedRequest = await this.resourceRequestService.rejectRequest(id, rejectionReason);
      res.status(200).json(updatedRequest);
    } catch (error) {
      handleError(res, 'Failed to reject resource request', error);
    }
  }

  async getRequestsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const requests = await this.resourceRequestService.getRequestsByStatus(status);
      res.status(200).json(requests);
    } catch (error) {
      handleError(res, 'Failed to fetch resource requests by status', error);
    }
  }
}
