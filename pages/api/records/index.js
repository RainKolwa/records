import { getSession } from 'next-auth/react';
import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const records = await Record.find({});
        res.status(200).json({ code: 0, data: records });
      } catch (error) {
        res.status(400).json({ code: 1 });
      }
      break;
    case 'POST':
      try {
        const session = await getSession({ req });
        console.log(session);
        if (!session) {
          res.status(401).json({ error: 'Unauthorized' });
        }
        const record = await Record.create(req.body);
        res.status(201).json({ code: 0, data: record });
      } catch (error) {
        res.status(400).json({ code: 1 });
      }
      break;
    default:
      res.status(400).json({ code: 1 });
      break;
  }
}
