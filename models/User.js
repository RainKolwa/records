import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
