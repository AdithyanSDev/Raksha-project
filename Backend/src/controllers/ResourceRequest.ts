// src/controllers/ResourceRequestController.ts
import { Request, Response } from 'express';
import { ResourceRequestService } from '../services/ResourceRequest';
import { handleError } from '../utils/ErrorHandler';

export class ResourceRequestController {
  private resourceRequestService: ResourceRequestService;

  constructor() {
    this.resourceRequestService = new ResourceRequestService();
  }

  createResourceRequest = async (req: Request, res: Response) => {
    try {
      const resourceRequest = await this.resourceRequestService.createResourceRequest(req.body);
      res.status(201).json(resourceRequest);
    } catch (error) {
      handleError(res, 'Failed to create resource request', error);
    }
  };

  getAllResourceRequests = async (req: Request, res: Response) => {
    try {
      const resourceRequests = await this.resourceRequestService.getAllResourceRequests();
      res.status(200).json(resourceRequests);
    } catch (error) {
      handleError(res, 'Failed to fetch resource requests', error);
    }
  };
  approveRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedRequest = await this.resourceRequestService.approveRequest(id);
      res.status(200).json(updatedRequest);
    } catch (error) {
      handleError(res, 'Failed to approve resource request', error);
    }
  };
  
  rejectRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;
      const updatedRequest = await this.resourceRequestService.rejectRequest(id, rejectionReason);
      res.status(200).json(updatedRequest);
    } catch (error) {
      handleError(res, 'Failed to reject resource request', error);
    }
  };
  
  getRequestsByStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.params;
      const requests = await this.resourceRequestService.getRequestsByStatus(status);
      res.status(200).json(requests);
    } catch (error) {
      handleError(res, 'Failed to fetch resource requests by status', error);
    }
  };
  
}
