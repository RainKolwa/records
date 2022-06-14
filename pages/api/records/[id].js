import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';
import withSession from '@/lib/withSession';
import authCheck from '@/lib/authCheck';

const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  const post = await Record.findById(id);
  if (!post) {
    return res.status(400).json({ code: 1, message: 'Record not found' });
  }
  await authCheck({ req, userId: post.author });

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ code: 0, data: post });
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
        res.status(200).json({ code: 0, data: record });
      } catch (error) {
        res.status(400).json({ code: 1, message: error.message });
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
