// controllers/ResourceRequestController.ts
import { Request, Response } from 'express';
import { ResourceRequestService } from '../services/ResourceRequest';

export class ResourceRequestController {
  private resourceRequestService: ResourceRequestService;

  constructor() {
    this.resourceRequestService = new ResourceRequestService();
  }
  
  createResourceRequest = async (req: Request, res: Response): Promise<Response> => {
    const { 
      userId, resourceType, quantity, description, location, address, contactInfo, 
      urgencyLevel, disasterType, numberOfPeopleAffected, additionalInfo, documents 
    } = req.body;
    console.log(req.body)
    try {
      const resourceRequest = await this.resourceRequestService.createResourceRequest(
        userId, resourceType, quantity, description, location, address, contactInfo, 
        urgencyLevel, disasterType, numberOfPeopleAffected, additionalInfo, documents
      );

      return res.status(201).json(resourceRequest);
    } catch (error:any) {
      return res.status(400).json({ message: error.message });
    }
  };

  public async getResourceRequests(req: Request, res: Response): Promise<void> {
    try {
      const resourceRequests = await this.resourceRequestService.getAllResourceRequests();
      res.status(200).json(resourceRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resource requests' });
    }
  }
}
