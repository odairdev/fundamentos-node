import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: Balance, transaction: Transaction) => {
      switch(transaction.type) {
        case('income'):
          accumulator.income += Number(transaction.value);
          break;
        case('outcome'):
          accumulator.outcome += Number(transaction.value);
          break;
        default:
          break;
      }
      return accumulator
    }

    const { income, outcome } = this.transactions.reduce(reducer, {
      income: 0,
      outcome: 0,
      total: 0
    })

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total
    } 

    return balance;
    
  }

  public create( {title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })

    this.transactions.push(transaction)

    return transaction;
  }
}

export default TransactionsRepository;
