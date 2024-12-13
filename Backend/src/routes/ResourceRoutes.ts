import express from 'express';
import { ResourceRequestController } from '../controllers/ResourceRequest';
import upload from '../multer/upload';
import { ResourceController } from '../controllers/ResourceController';
import ResourceService from '../services/ResourceService'; // Correct import without instantiating
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Initialize the ResourceController with the singleton ResourceService instance
const resourceController = new ResourceController(ResourceService);

const resourceRequestController = new ResourceRequestController();

// Route to handle creating a resource request
router.post('/request',authMiddleware, upload.single('resourceDocuments'), resourceRequestController.createResourceRequest);
router.get('/resource-request',authMiddleware, resourceRequestController.getAllResourceRequests.bind(resourceRequestController));

// Route to create a resource
router.post('/resources',authMiddleware, upload.single('image'), resourceController.createResource.bind(resourceController));

// Route to get all resources
router.get('/resources',authMiddleware, resourceController.getAllResources.bind(resourceController));

// Route to update a resource
router.put('/resources/:id',authMiddleware, upload.single('image'), resourceController.updateResource.bind(resourceController));

// Route to delete a resource
router.delete('/resources/:id',authMiddleware, resourceController.deleteResource.bind(resourceController));

router.put('/request/:id/approve',authMiddleware, resourceRequestController.approveRequest.bind(resourceRequestController));
router.put('/request/:id/reject',authMiddleware, resourceRequestController.rejectRequest.bind(resourceRequestController));
router.get('/requests/:status',authMiddleware, resourceRequestController.getRequestsByStatus.bind(resourceRequestController));

export default router;
