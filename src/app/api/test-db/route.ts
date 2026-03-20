import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    
    if (!conn || !conn.connection) {
      throw new Error('Connection failed');
    }

    return NextResponse.json({ 
      message: 'MongoDB connection successful',
      readyState: conn.connection.readyState 
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('MongoDB connection error:', errorMessage);
    return NextResponse.json({ 
      error: 'Failed to connect to MongoDB', 
      details: errorMessage
    }, { status: 500 });
  }
}
