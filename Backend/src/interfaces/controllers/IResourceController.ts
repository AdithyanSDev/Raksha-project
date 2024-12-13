import { Request, Response } from 'express';

export interface IResourceController {
  createResource(req: Request, res: Response): Promise<void>;
  getAllResources(req: Request, res: Response): Promise<void>;
  updateResource(req: Request, res: Response): Promise<void>;
  deleteResource(req: Request, res: Response): Promise<void>;
}
