// src/interfaces/controllers/IResourceRequestController.ts
import { Request, Response } from 'express';

export interface IResourceRequestController {
  createResourceRequest(req: Request, res: Response): Promise<void>;
  getAllResourceRequests(req: Request, res: Response): Promise<void>;
  approveRequest(req: Request, res: Response): Promise<void>;
  rejectRequest(req: Request, res: Response): Promise<void>;
  getRequestsByStatus(req: Request, res: Response): Promise<void>;
}
