import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // get auth token from request header
    const authHeader = req.header('Authorization');
    
    if( ! authHeader && ! authHeader?.startsWith('Bearer ') ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // extract and verify token
    const token = authHeader.split(' ')[1];

    req.user = { _id: token, name: 'Mohammad Wahid', email: 'wahid@gmail.com' };
    next();
  } catch(error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authMiddleware;