import { Router } from 'express';
import { VolunteerController } from '../controllers/VolunteerController';

const volunteerController = new VolunteerController();
const router = Router();

router.post('/volunteer', volunteerController.registerVolunteer);
router.get('/volunteer/:userId', volunteerController.getVolunteer);
router.put('/volunteer/:userId', volunteerController.updateVolunteer);
router.get('/volunteers/check/:userId', volunteerController.checkVolunteerStatus);
router.get('/volunteer/:userId', volunteerController.getVolunteerByUserId);
router.put('/volunteers/:id', volunteerController.updateVolunteerProfile);

//admin
router.get('/volunteers', volunteerController.getAllVolunteers); 
router.get('/volunteers/pending', volunteerController.getPendingVolunteers);
router.put('/volunteers/:volunteerId/approve', volunteerController.approveVolunteer);
router.put('/volunteers/:volunteerId/reject', volunteerController.rejectVolunteer);
router.put('/volunteers/:volunteerId/assign-task', volunteerController.assignTask);
router.get('/volunteers/:id',volunteerController.getVolunteerById)
export default router;
