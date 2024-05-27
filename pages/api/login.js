import { compare } from 'bcryptjs';
import { connectToDatabase } from '../../utils/mongodb';
import { sign } from 'jsonwebtoken';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
};
