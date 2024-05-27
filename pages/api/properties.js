// pages/api/properties.js

import { clientPromise } from '../../utils/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  try {
    if (req.method === 'GET') {
      const { place, bedrooms, bathrooms } = req.query;

      const filters = {};
      if (place) filters.place = place;
      if (bedrooms) filters.bedrooms = parseInt(bedrooms);
      if (bathrooms) filters.bathrooms = parseInt(bathrooms);

      const properties = await db.collection('properties').find(filters).toArray();

      res.json(properties);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
