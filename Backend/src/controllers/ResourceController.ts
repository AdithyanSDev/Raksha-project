import { Request, Response } from 'express';
import ResourceService from '../services/ResourceService';

export class ResourceController {
  async createResource(req: Request, res: Response) {
    const { name, type, quantity, location, description, available } = req.body;
    
    // Use 'any' to access the location property from req.file
    const imageUrl = req.file ? (req.file as any).location : ''; // Cast to 'any' to access location

    try {
      const resourceData = {
        name,
        type,
        quantity,
        location,
        description,
        available,
        image: imageUrl, // Save the image URL in the resource data
      };

      const resource = await ResourceService.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating resource', error });
    }
  }

  async getAllResources(req: Request, res: Response) {
    try {
      const resources = await ResourceService.getAllResources();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resources', error });
    }
  }

  async updateResource(req: Request, res: Response) {
    try {
      const resourceData = req.body;
      console.log(resourceData,"resource datta")
      const updatedResource = await ResourceService.updateResource(req.params.id, resourceData);
      res.status(200).json(updatedResource);
    } catch (error) {
      res.status(500).json({ message: 'Error updating resource', error });
    }
  }

  async deleteResource(req: Request, res: Response) {
    try {
      await ResourceService.deleteResource(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting resource', error });
    }
  }
}
