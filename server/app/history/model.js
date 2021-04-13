import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const History = new Schema({
  method: String,
  uri: String,
  response: String,
  user: mongoose.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

History.statics.findByUserObjectId = function(objectId) {
  return this.find({ user: objectId }).exec();
}

export default mongoose.model('history', History);
