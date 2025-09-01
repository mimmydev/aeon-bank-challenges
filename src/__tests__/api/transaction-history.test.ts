import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/transaction-history/route';
import { NextRequest } from 'next/server';

describe('/api/transaction-history', () => {
  it('returns transaction data', async () => {
    const mockRequest = new NextRequest(
      'http://localhost:3000/api/transaction-history'
    );
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.pagination).toBeDefined();

    const transaction = data.data[0];
    expect(transaction).toHaveProperty('date');
    expect(transaction).toHaveProperty('referenceId');
    expect(transaction).toHaveProperty('to');
    expect(transaction).toHaveProperty('transactionType');
    expect(transaction).toHaveProperty('amount');
  });
});
