import { Transaction } from '../../../../src/account/core/domain/transaction';
import { TransactionType } from '../../../../src/account/core/domain/transaction-type';

describe('Transaction', () => {
  describe('constructor', () => {
    it('should not accept empty transaction Id', () => {
      expect(() => new Transaction(null, null, null, null, null)).toThrow('Transaction Id cannot be null');
    });
    it('should not accept empty value', () => {
      expect(() => new Transaction('1', null, null, null, null)).toThrow('Value cannot be null');
    });
    it('should not accept zero value', () => {
      expect(() => new Transaction('1', 0, null, null, null)).toThrow('Value cannot be zero');
    });
    it('should not accept null description', () => {
      expect(() => new Transaction('1', 10, null, null, null)).toThrow('Description cannot be null');
    });
    it('should not accept null transaction type', () => {
      expect(() => new Transaction('1', 10, 'desc', null, null)).toThrow('Transaction Type cannot be null');
    });
    it('should not accept null date', () => {
      expect(() => new Transaction('1', 10, 'desc', TransactionType.CREDIT, null)).toThrow('Date cannot be null');
    });
    it('should fill all fields', () => {
      const date = new Date();
      const transaction = new Transaction('1', 10, 'desc', TransactionType.CREDIT, date);
      expect(transaction.transactionId).toBe('1');
      expect(transaction.value).toBe(10);
      expect(transaction.description).toBe('desc');
      expect(transaction.transactionType).toBe(TransactionType.CREDIT);
      expect(transaction.transactionDate).toBe(date);
    });
    it('should fill all fields 2', () => {
      const date = new Date();
      const transaction = new Transaction('2', 6, 'desc2', TransactionType.DEBIT, date);
      expect(transaction.transactionId).toBe('2');
      expect(transaction.value).toBe(6);
      expect(transaction.description).toBe('desc2');
      expect(transaction.transactionType).toBe(TransactionType.DEBIT);
      expect(transaction.transactionDate).toBe(date);
    });
  });
});
