import * as express from 'express';
import { AdminController } from '../controller/AdminController';

export const adminRouter = express.Router();

const adminController = new AdminController();

adminRouter.get('/admin/users', adminController.getAllUsers);
adminRouter.post('/admin/create', adminController.createUser);
adminRouter.delete('/admin/delete', adminController.deleteUser);
