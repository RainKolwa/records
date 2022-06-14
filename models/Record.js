import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecordSchema = new Schema(
  {
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
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Record || mongoose.model('Record', RecordSchema);
