import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  sleepBegin: {
    type: Date,
    required: [true, 'Please specify a sleep begin time'],
  },
  sleepEnd: {
    type: Date,
    required: [true, 'Please specify a sleep end time'],
  },
  eatBegin: {
    type: Date,
    required: [true, 'Please specify an eat begin time'],
  },
  eatEnd: {
    type: Date,
    required: [true, 'Please specify an eat end time'],
  },
  sport: {
    type: Number,
  },
});

export default mongoose.models.Record || mongoose.model('Record', RecordSchema);
