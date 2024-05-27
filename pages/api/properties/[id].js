import { clientPromise } from '../../../utils/mongodb';
import { verifyToken } from '../../../utils/auth';
import { ObjectId } from 'mongodb';
import { sendEmail } from '../../../utils/email';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = req.query;

  if (req.method === 'GET') {
    const token = req.headers.authorization.split(' ')[1];
    const { userId, email } = verifyToken(token);

    const property = await db.collection('properties').findOne({ _id: ObjectId(id) });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await sendEmail(email, 'Property Details', `Here are the details for the property: ${property.title}`);

    res.json({ seller: { email: property.sellerEmail } });
  } else {
    res.status(405).end();
  }
}
