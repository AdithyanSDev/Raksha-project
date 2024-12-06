// src/routes/resourceRequestRoutes.ts

import express from 'express';
import { ResourceRequestController } from '../controllers/ResourceRequest';
import upload from '../middlewares/upload';
import { ResourceController } from '../controllers/ResourceController';

const router = express.Router();
const resourceRequestController = new ResourceRequestController();
const resourceController = new ResourceController();

// Route to handle creating a resource request
router.post('/request', upload.single('resourceDocuments'), resourceRequestController.createResourceRequest);
router.get('/resource-request', resourceRequestController.getAllResourceRequests.bind(resourceRequestController));

// Route to create a resource
router.post('/resources', upload.single('image'), resourceController.createResource.bind(resourceController));

// Route to get all resources
router.get('/resources', resourceController.getAllResources.bind(resourceController));

// Route to update a resource
router.put('/resources/:id',upload.single('image'), resourceController.updateResource.bind(resourceController));

// Route to delete a resource
router.delete('/resources/:id', resourceController.deleteResource.bind(resourceController));

router.put('/request/:id/approve', resourceRequestController.approveRequest.bind(resourceRequestController));
router.put('/request/:id/reject', resourceRequestController.rejectRequest.bind(resourceRequestController));
router.get('/requests/:status', resourceRequestController.getRequestsByStatus.bind(resourceRequestController));


export default router;
