import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const records = await Record.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: records });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const record = await Record.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: record });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
