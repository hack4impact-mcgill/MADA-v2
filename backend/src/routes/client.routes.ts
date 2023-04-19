import * as express from 'express';
import ClientController from '../controllers/clients';

// Create a router object
export const router = express.Router();
const clientController = new ClientController();

router.get('/clients', clientController.getClients);