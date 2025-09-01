import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedTransactions } from '@/lib/mock-transactions';
import type { TransactionHistoryResponse } from '@/app/types/transaction';

/**
 * Transaction History API Endpoint
 * Responsibility: Fetch and return paginated transaction data
 * Clean Code Principle: Single Responsibility - only handles transaction data retrieval
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get('limit') || '10'))
    );
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    await new Promise((resolve) => setTimeout(resolve, 600));

    const { transactions, total, totalPages } = getPaginatedTransactions(
      page,
      limit
    );

    const sortedTransactions = [...transactions].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'to':
          comparison = a.to.localeCompare(b.to);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    const response: TransactionHistoryResponse = {
      success: true,
      data: sortedTransactions,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      message: 'Transaction history retrieved successfully',
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-cache', //** Don't cache sensitive financial data
      },
    });
  } catch (error) {
    console.error('Error in transaction-history API:', error);

    const errorResponse: TransactionHistoryResponse = {
      success: false,
      data: [],
      message: 'Failed to retrieve transaction history. Please try again.',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed. Use GET or POST.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed. Use GET or POST.' },
    { status: 405 }
  );
}
