import { Request, Response } from 'express';
import { IResourceController } from '../interfaces/controllers/IResourceController';
import { IResourceService } from '../interfaces/services/IResourceService';
import ResourceService from '../services/ResourceService';
import { handleError } from '../utils/ErrorHandler';

export class ResourceController implements IResourceController {
  private resourceService: IResourceService;

  constructor(resourceService: IResourceService) {
    this.resourceService = resourceService;
  }

  async createResource(req: Request, res: Response): Promise<void> {
    try {
      const { name, type, quantity, location, description, available } = req.body;
      const imageUrl = req.file ? (req.file as any).location : ''; // Handle file upload

      const resourceData = { name, type, quantity, location, description, available, image: imageUrl };
      const resource = await this.resourceService.createResource(resourceData);

      res.status(201).json(resource);
    } catch (error) {
      handleError(res, 'Error creating resource', error);
    }
  }

  async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const resources = await this.resourceService.getAllResources();
      res.status(200).json(resources);
    } catch (error) {
      handleError(res, 'Error fetching resources', error);
    }
  }

  async updateResource(req: Request, res: Response): Promise<void> {
    try {
      const updatedResource = await this.resourceService.updateResource(req.params.id, req.body);
      res.status(200).json(updatedResource);
    } catch (error) {
      handleError(res, 'Error updating resource', error);
    }
  }

  async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      await this.resourceService.deleteResource(req.params.id);
      res.status(204).send();
    } catch (error) {
      handleError(res, 'Error deleting resource', error);
    }
  }
}
