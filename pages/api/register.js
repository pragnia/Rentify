import { hash } from 'bcryptjs';
import { connectToDatabase } from '../../utils/mongodb';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, password, phone, role } = req.body;

  const { db } = await connectToDatabase();

  const hashedPassword = await hash(password, 10);

  await db.collection('users').insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  res.status(201).json({ message: 'User registered successfully' });
};
