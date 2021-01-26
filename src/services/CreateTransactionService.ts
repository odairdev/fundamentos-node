import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: RequestDTO): Transaction {

    const { total } = this.transactionsRepository.getBalance()
    
    if (type == "outcome" && value > total) { throw Error('Not enough balance to make this transaction.')}
    
    if (type != "income" && type != "outcome") {
      throw Error('The transaction must be either an income or outcome type.')
    } 
       
    const transaction = this.transactionsRepository.create({title, value, type})

    return transaction;
  }
}

export default CreateTransactionService;