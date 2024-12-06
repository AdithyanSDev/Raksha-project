import { Request, Response } from 'express';
import ResourceService from '../services/ResourceService';
import { handleError } from '../utils/ErrorHandler';

export class ResourceController {
  async createResource(req: Request, res: Response) {
    try {
      const { name, type, quantity, location, description, available } = req.body;
      const imageUrl = req.file ? (req.file as any).location : ''; // Handle file upload
      
      const resourceData = { name, type, quantity, location, description, available, image: imageUrl };
      const resource = await ResourceService.createResource(resourceData);

      res.status(201).json(resource);
    } catch (error) {
      handleError(res, 'Error creating resource', error);
    }
  }

  async getAllResources(req: Request, res: Response) {
    try {
      const resources = await ResourceService.getAllResources();
      res.status(200).json(resources);
    } catch (error) {
      handleError(res, 'Error fetching resources', error);
    }
  }

  async updateResource(req: Request, res: Response) {
    try {
      const updatedResource = await ResourceService.updateResource(req.params.id, req.body);
      res.status(200).json(updatedResource);
    } catch (error) {
      handleError(res, 'Error updating resource', error);
    }
  }

  async deleteResource(req: Request, res: Response) {
    try {
      await ResourceService.deleteResource(req.params.id);
      res.status(204).send();
    } catch (error) {
      handleError(res, 'Error deleting resource', error);
    }
  }
}
