import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/IJwtPayload';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // get auth token from request header
    const authHeader = req.header('Authorization');

    if (!authHeader && !authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // extract and verify token
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IJwtPayload;
    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

export default authMiddleware;
