import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Re-assign to ensure TypeScript knows it's not undefined
const mongooseCached = cached!;

async function connectToDatabase() {
  if (mongooseCached.conn) {
    return mongooseCached.conn;
  }

  if (!mongooseCached.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongooseCached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    mongooseCached.conn = await mongooseCached.promise;
  } catch (e) {
    mongooseCached.promise = null;
    throw e;
  }

  return mongooseCached.conn;
}

export default connectToDatabase;
