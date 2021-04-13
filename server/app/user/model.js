import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  account_id: String,
  name: String,
  password: String,
  created_date: {
    type: Date,
    default: Date.now
  }
});

User.statics.findOneByAccountId = function(accounId) {
  return this.findOne({ account_id: accounId }).exec();
}

module.exports = mongoose.model('user', User);
