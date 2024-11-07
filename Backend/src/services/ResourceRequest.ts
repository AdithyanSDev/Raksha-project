import { ResourceRequestRepository } from '../repositories/ResourceRequest';
import { IResourceRequest, ResourceRequest } from '../models/ResourceRequests';

export class ResourceRequestService {
  private resourceRequestRepository: ResourceRequestRepository;

  constructor() {
    this.resourceRequestRepository = new ResourceRequestRepository();
  }

  async createResourceRequest(
    userId: string, 
    resourceType: string, 
    quantity: number, 
    description: string, 
    location: string, 
    address: string, 
    contactInfo: string,
    urgencyLevel: string, 
    disasterType: string,
    numberOfPeopleAffected: number,
    additionalInfo?: string,
    documents?: string[]
  ): Promise<IResourceRequest> {
    // Creating a new Mongoose model instance
    const resourceRequest = new ResourceRequest({
      userId,
      resourceType,
      quantity,
      description,
      location,
      address,
      contactInfo,
      urgencyLevel,
      disasterType,
      numberOfPeopleAffected,
      additionalInfo,
      documents,
    });
 console.log(resourceRequest,"service")
    // Save the model instance through the repository
    return await this.resourceRequestRepository.createResourceRequest(resourceRequest);
  }

   // Get all resource requests
   public async getAllResourceRequests(): Promise<IResourceRequest[]> {
    try {
      return await this.resourceRequestRepository.findAll();
    } catch (error) {
      throw new Error('Error getting resource requests');
    }
  }
}
