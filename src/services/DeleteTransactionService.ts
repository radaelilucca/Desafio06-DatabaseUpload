import { getRepository } from 'typeorm';

import validate from 'uuid-validate';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);

    const validId = validate(id);

    if (!validId) {
      throw new AppError('Invalid uuid', 401);
    }

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('This transaction does not exists', 404);
    }
    await transactionsRepository.remove(transaction);

    return transaction;
  }
}

export default DeleteTransactionService;
