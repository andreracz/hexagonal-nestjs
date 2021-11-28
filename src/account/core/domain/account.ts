import { Transaction } from './transaction';
import { TransactionType } from './transaction-type';
import { v4 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

export class Account {
  private _balance: number;
  private _transactions: Transaction[] = [];

  constructor(private _accountId: string, private _clientId: string, transactions: Transaction[]) {
    if (!this._accountId) {
      throw new Error('Account Id cannot be null');
    }
    if (!this._clientId) {
      throw new Error('Client Id cannot be null');
    }
    this._balance = 0;
    for (const transaction of transactions) {
      if (transaction.transactionType == TransactionType.CREDIT) {
        this._balance += transaction.value;
      } else {
        this._balance -= transaction.value;
      }
      this._transactions.push(transaction);
      if (this._balance < 0) {
        throw new Error('Balance cannot be lower than zero');
      }
    }
  }

  @Expose()
  public get balance(): number {
    return this._balance;
  }

  @Expose()
  public get accountId(): string {
    return this._accountId;
  }

  @Expose()
  public get clientId(): string {
    return this._clientId;
  }

  @Expose()
  public get transactions(): Transaction[] {
    return [...this._transactions];
  }

  public deposit(value: number, description: string) {
    this._balance += value;
    this._transactions.push(new Transaction(uuid(), value, description, TransactionType.CREDIT, new Date()));
  }

  public withdraw(value: number, description: string) {
    if (this._balance - value < 0) {
      throw new Error(`Not enough funds to withdraw ${value}`);
    }
    this._balance -= value;
    this._transactions.push(new Transaction(uuid(), value, description, TransactionType.DEBIT, new Date()));
  }

  public transfer(destinationAccount: Account, value: number, description: string) {
    this.withdraw(value, description);
    destinationAccount.deposit(value, description);
  }
}
