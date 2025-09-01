import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/login/route';
import { NextRequest } from 'next/server';

describe('/api/login', () => {
  it('returns success for valid encrypted credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'testuser',
        password: 'test123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('rejects requests without username', async () => {
    const request = new NextRequest('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({
        password: 'hashed_password_123',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
