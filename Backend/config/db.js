import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGO_DB_NAME || 'Arcadia';

    if (!uri) {
      throw new Error('MONGODB_URI is not set');
    }

    const conn = await mongoose.connect(uri, {
      dbName,
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${dbName}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Redact credentials if we print URI
    const safeUri = (process.env.MONGODB_URI || '').replace(/:\S+@/, ':***@');
    console.warn(`ℹ️ Using URI: ${safeUri}`);
    console.warn('⚠️  Server will continue running without database connection');
    console.warn('⚠️  Please verify MONGODB_URI and that special characters in the password are percent-encoded (e.g., # -> %23)');
    return null;
  }
};

export default connectDB;
