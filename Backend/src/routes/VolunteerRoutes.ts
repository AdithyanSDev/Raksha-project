import { Router } from 'express';
import { VolunteerController } from '../controllers/VolunteerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const volunteerController = new VolunteerController();
const router = Router();

router.post('/volunteer',authMiddleware, volunteerController.registerVolunteer);
router.get('/volunteer/:userId', authMiddleware,volunteerController.getVolunteer);
router.put('/volunteer/:userId',authMiddleware, volunteerController.updateVolunteer);
router.get('/volunteers/check/:userId',authMiddleware, volunteerController.checkVolunteerStatus);
router.get('/volunteer/:userId', authMiddleware,volunteerController.getVolunteerByUserId);
router.put('/volunteers/:id',authMiddleware, volunteerController.updateVolunteerProfile);

//admin
router.get('/volunteers',authMiddleware, volunteerController.getAllVolunteers); 
router.get('/volunteers/pending',authMiddleware, volunteerController.getPendingVolunteers);
router.put('/volunteers/:volunteerId/approve', volunteerController.approveVolunteer);
router.put('/volunteers/:volunteerId/reject', volunteerController.rejectVolunteer);
router.put('/volunteers/:volunteerId/assign-task', volunteerController.assignTask);
router.get('/volunteers/:id',authMiddleware,volunteerController.getVolunteerById)
export default router;
