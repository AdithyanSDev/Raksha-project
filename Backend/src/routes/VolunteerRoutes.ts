import { Router } from 'express';
import { VolunteerController } from '../controllers/VolunteerController';

const volunteerController = new VolunteerController();
const router = Router();

router.post('/volunteer', volunteerController.registerVolunteer);
router.get('/volunteer/:userId', volunteerController.getVolunteer);
router.put('/volunteer/:userId', volunteerController.updateVolunteer);
router.get('/volunteers/check/:userId', volunteerController.checkVolunteerStatus);

//admin
router.get('/volunteers', volunteerController.getAllVolunteers);
router.get('/volunteers/pending', volunteerController.getPendingVolunteers);
router.put('/volunteers/:volunteerId/approve', volunteerController.approveVolunteer);
router.put('/volunteers/:volunteerId/reject', volunteerController.rejectVolunteer);

export default router;
