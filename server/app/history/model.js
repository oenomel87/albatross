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
