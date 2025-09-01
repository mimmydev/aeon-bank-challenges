import { NextRequest, NextResponse } from 'next/server';
import { userExists } from '@/lib/mock-users';
import type { SecureWordResponse } from '@/app/types/login';

/**
 * Mock API endpoint to generate secure word
 * Responsibility: Return static secure word ONLY for valid usernames
 * Clean Code Principle: Single Responsibility - handles secure word generation with validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Username is required',
          secureWord: '',
        } satisfies SecureWordResponse,
        { status: 400 }
      );
    }

    if (username.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username must be at least 3 characters long',
          secureWord: '',
        } satisfies SecureWordResponse,
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!userExists(username.trim())) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Username not found. Please check your username and try again.',
          secureWord: '',
        } satisfies SecureWordResponse,
        { status: 404 }
      );
    }

    const response: SecureWordResponse = {
      success: true,
      secureWord: 'secure123',
      message: 'Secure word generated successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in getSecureWord API:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        secureWord: '',
      } satisfies SecureWordResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
