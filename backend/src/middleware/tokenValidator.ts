import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/error';

interface AuthRequest extends Request {
  user?: string | object; 
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError(401,"Unauthorized: No token provided")
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new CustomError(403,"Forbidden: Invalid token")
      }

      next(); 
    });
  } catch (error) {
    next(error)
  }
};

export default verifyToken;
