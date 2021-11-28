import { Expose } from 'class-transformer';
import { TransactionType } from './transaction-type';

export class Transaction {
  constructor(
    private _transactionId: string,
    private _value: number,
    private _description: string,
    private _transactionType: TransactionType,
    private _transactionDate: Date,
  ) {
    if (_transactionId == null) {
      throw new Error('Transaction Id cannot be null');
    }
    if (_value == null) {
      throw new Error('Value cannot be null');
    }
    if (_value == 0) {
      throw new Error('Value cannot be zero');
    }
    if (_description == null) {
      throw new Error('Description cannot be null');
    }
    if (_transactionType == null) {
      throw new Error('Transaction Type cannot be null');
    }
    if (_transactionDate == null) {
      throw new Error('Date cannot be null');
    }
  }

  @Expose()
  public get value(): number {
    return this._value;
  }

  @Expose()
  public get transactionId(): string {
    return this._transactionId;
  }

  @Expose()
  public get transactionType(): TransactionType {
    return this._transactionType;
  }

  @Expose()
  public get transactionDate(): Date {
    return this._transactionDate;
  }

  @Expose()
  public get description(): string {
    return this._description;
  }
}
