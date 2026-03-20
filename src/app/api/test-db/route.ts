import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({ 
      message: 'MongoDB connection successful',
      readyState: conn.connection.readyState 
    }, { status: 200 });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to MongoDB', 
      details: error.message 
    }, { status: 500 });
  }
}
