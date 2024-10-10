import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const stringConnection:string = process.env.DB_STRING_CONNECTION || '';
    await mongoose.connect(stringConnection);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
}

export default connectToDatabase
