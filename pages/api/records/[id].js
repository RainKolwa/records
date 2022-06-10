import dbConnect from '../../../lib/dbConnect';
import Record from '../../../models/Record';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const record = await Record.findById(id);
        if (!record) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: record });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        const record = await Record.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!record) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: record });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedRecord = await Record.deleteOne({ _id: id });
        if (!deletedRecord) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
