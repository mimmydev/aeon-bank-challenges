import { NextRequest, NextResponse } from 'next/server';
import {
  validateUserCredentials,
  validateUserCredentialsWithClientHash,
} from '@/lib/mock-users';
import type { LoginResponse } from '@/app/types/login';

/**
 * Login API endpoint with proper password validation
 * Responsibility: Authenticate user with real credential checking
 * Security: Uses bcrypt.compare() for secure password validation
 * Clean Code Principle: Single Responsibility - only handles authentication
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, isClientHashed } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Username is required',
        } satisfies LoginResponse,
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Password is required',
        } satisfies LoginResponse,
        { status: 400 }
      );
    }

    if (username.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username must be at least 3 characters long',
        } satisfies LoginResponse,
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters long',
        } satisfies LoginResponse,
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use appropriate validation function based on whether password is client-hashed
    const user = isClientHashed
      ? await validateUserCredentialsWithClientHash(username.trim(), password)
      : await validateUserCredentials(username.trim(), password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid username or password. Please check your credentials and try again.',
        } satisfies LoginResponse,
        { status: 401 }
      );
    }

    const response: LoginResponse = {
      success: true,
      message: `Welcome back, ${user.username}! Login successful.`,
      user: {
        username: user.username,
        loginTime: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in login API:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      } satisfies LoginResponse,
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
