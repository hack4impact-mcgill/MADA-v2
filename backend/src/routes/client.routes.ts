import * as express from 'express';
import ClientController from '../controllers/client';

// Create a router object
export const router = express.Router();
const clientController = new ClientController();

router.get('/client/:id', clientController.getClient);
router.put('/client/:id', clientController.updateOrCreateClient);
router.put('/client/', clientController.updateOrCreateClient);
router.delete('/client/:id', clientController.deleteClient);
