import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Token from '../models/Token';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export const register = async (req: Request, res: Response) => {
  const { error } = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(422).json({ message: error.details[0].message });

  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist)
      return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({ message: 'Registration success' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(422).json({ message: error.details[0].message });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const payload: IJwtPayload = {
      user: { _id: user._id, email, name: user.name },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1h from now
    await Token.create({ token, user: user._id, expiresAt });

    return res.status(200).json({ ...payload, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
