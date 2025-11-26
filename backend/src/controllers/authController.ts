import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Helper to generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// Helper to send token in cookie
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (Number(process.env.JWT_COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
    },
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, location } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      location,
    });

    sendTokenResponse(user, 201, res);
  } catch (err: any) {
    // Handle duplicate key error
    if (err.code === 11000) {
        res.status(400).json({ success: false, error: 'Email already exists' });
        return;
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Please provide an email and password' });
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
  }
};
