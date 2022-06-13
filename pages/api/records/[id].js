import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';
import withSession from '@/lib/withSession';

const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const record = await Record.findById(id);
        if (!record) {
          return res.status(400).json({ code: 1, message: 'Record not found' });
        }
        res.status(200).json({ code: 0, data: record });
      } catch (error) {
        res.status(400).json({ code: 1, message: 'Failed to get record' });
      }
      break;

    case 'PUT':
      try {
        const record = await Record.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!record) {
          return res.status(400).json({ code: 1, message: 'Record not found' });
        }
        res.status(200).json({ code: 0, data: record });
      } catch (error) {
        res.status(400).json({ code: 1 });
      }
      break;

    case 'DELETE':
      try {
        const deletedRecord = await Record.deleteOne({ _id: id });
        if (!deletedRecord) {
          return res.status(400).json({ code: 1, message: 'Failed to delete' });
        }
        res.status(200).json({ code: 0, data: {} });
      } catch (error) {
        res.status(400).json({ code: 1 });
      }
      break;

    default:
      res.status(400).json({ code: 1 });
      break;
  }
};

export default withSession(handler);
