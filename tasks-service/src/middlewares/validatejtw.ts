import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { envs } from '../../config';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token not found' });
    return;
  }

  try {

    // Decode the token and save the user in the request
    const decoded = jwt.verify(token, envs.JWT_SECRET);

    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};