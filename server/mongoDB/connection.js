import mongoose from 'mongoose';

const mongoDBConnect = () => {
  try {
    // Support multiple common env var names for MongoDB URI
    const mongoUri = process.env.URL || process.env.MONGO_URI || process.env.URI || process.env.DATABASE_URL;
    if (!mongoUri) {
      console.log('Error - MongoDB Connection: no connection URI found in env (URL | MONGO_URI | URI | DATABASE_URL)');
      return;
    }
    mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB - Connected');
  } catch (error) {
    console.log('Error - MongoDB Connection ' + error);
  }
};

export default mongoDBConnect;
