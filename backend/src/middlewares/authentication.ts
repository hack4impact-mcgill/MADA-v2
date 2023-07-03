import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('jwt-token');
    jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return next();
  } catch (e) {
    return res.status(400).json({ error: 'unable to authenticate user' });
  }
};
