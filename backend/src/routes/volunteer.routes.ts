import * as express from 'express';
import VolunteerController from '../controllers/volunteers';

// Create a router object
export const router = express.Router();
const volunteerController = new VolunteerController();

router.get('/volunteers', volunteerController.getVolunteers);
router.delete('/volunteers/:id', volunteerController.removeVolunteer);
