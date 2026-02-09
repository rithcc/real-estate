import { NextRequest, NextResponse } from 'next/server';
import { Enquiry } from '@/types/property';

export async function POST(request: NextRequest) {
  try {
    const enquiry: Enquiry = await request.json();

    // Validate required fields
    if (!enquiry.name || !enquiry.mobile || !enquiry.email || !enquiry.propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, save to MongoDB here
    // For now, just log to console
    console.log('Enquiry received:', enquiry);

    // Simulate successful save
    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
