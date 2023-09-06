import * as express from 'express';
import AdminController from '../controllers/admin';

// Create a router object
export const router = express.Router();
const adminController = new AdminController();

router.post('/admin-login', adminController.login);
