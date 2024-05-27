import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
