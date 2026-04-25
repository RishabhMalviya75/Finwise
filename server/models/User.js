import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  hearts: {
    type: Number,
    default: 3,
  },
  badges: [{
    id: String,
    name: String,
    earnedAt: Date,
  }],
  completedStages: [String],
  completedQuests: [String],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
