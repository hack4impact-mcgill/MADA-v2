import * as express from 'express';

import { VolunteerController } from '../controller/VolunteerController';

export const volunteerRouter = express.Router();

const volunteerController = new VolunteerController();

volunteerRouter.get(
  '/volunteer/getAvailabilities',
  volunteerController.getAvailability
);
volunteerRouter.post(
  '/volunteer/updateAvailabilities',
  volunteerController.updateAvailabilities
);
volunteerRouter.get(
  '/volunteer/getPersonalInformation',
  volunteerController.getPersonalInformation
);
volunteerRouter.post(
  '/volunteer/updatePersonalInformation',
  volunteerController.updatePersonalInformation
);
