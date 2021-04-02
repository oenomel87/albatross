import mongoose from 'mongoose';

function connectToMongo() {
  mongoose.connect('mongodb://localhost:27017/albatross', {useNewUrlParser: true});
}

export { connectToMongo }
