import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions: Array<Transaction>): Promise<Balance> {
    const { income, outcome } = transactions.reduce(
      (accumulator, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);

            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);

            break;

          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    console.table(balance);

    return balance;
  }
}

export default TransactionsRepository;
