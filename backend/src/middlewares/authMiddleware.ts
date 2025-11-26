import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Protect routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as DecodedToken;

    // Get user from the token
    (req as any).user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      res.status(403).json({
        success: false,
        error: `User role ${(req as any).user.role} is not authorized to access this route`,
      });
      return;
    }
    next();
  };
};
