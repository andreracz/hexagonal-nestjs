import { Expose } from 'class-transformer';
import { TransactionType } from './transaction-type';

export class Transaction {
  constructor(
    private _transactionId: string,
    private _value: number,
    private _description: string,
    private _transactionType: TransactionType,
    private _transactionDate: Date,
  ) {}

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
