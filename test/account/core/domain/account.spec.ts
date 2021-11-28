import { Account } from '../../../../src/account/core/domain/account';
import { Transaction } from '../../../../src/account/core/domain/transaction';
import { TransactionType } from '../../../../src/account/core/domain/transaction-type';

describe('Account', () => {
  describe('constructor', () => {
    it('should not accept empty account Id', () => {
      expect(() => new Account(null, '2', [])).toThrow('Account Id cannot be null');
    });

    it('should not accept empty client Id', () => {
      expect(() => new Account('1', null, [])).toThrow('Client Id cannot be null');
    });

    it('should have zero balance with empty transactions', () => {
      const account = new Account('1', '2', []);
      expect(account.balance).toBe(0);
    });

    it('should calculate the correct balance with credit', () => {
      const account = new Account('1', '2', [new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date())]);
      expect(account.balance).toBe(10);
      expect(account.accountId).toBe('1');
      expect(account.clientId).toBe('2');
    });

    it('should calculate the correct balance with credit and debit', () => {
      const account = new Account('1', '2', [
        new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date()),
        new Transaction('1', 10, 'desc', TransactionType.DEBIT, new Date()),
      ]);
      expect(account.balance).toBe(0);
    });
    it('should not allow negative balance', () => {
      expect(
        () =>
          new Account('1', '2', [
            new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date()),
            new Transaction('1', 11, 'desc', TransactionType.DEBIT, new Date()),
          ]),
      ).toThrow('Balance cannot be lower than zero');
    });
    it('should not allow negative intermediate balance', () => {
      expect(
        () =>
          new Account('1', '2', [
            new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date()),
            new Transaction('1', 11, 'desc', TransactionType.DEBIT, new Date()),
            new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date()),
          ]),
      ).toThrow('Balance cannot be lower than zero');
    });
  });
  describe('deposit', () => {
    it('should calculate the correct balance', () => {
      const account = new Account('1', '2', []);
      expect(account.balance).toBe(0);
      account.deposit(10, 'description');
      expect(account.balance).toBe(10);
      expect(account.transactions.length).toBe(1);
      expect(account.transactions[0].transactionType).toBe(TransactionType.CREDIT);
    });
    it('should calculate the correct balance with previous transactions', () => {
      const account = new Account('1', '2', [new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date())]);
      expect(account.balance).toBe(10);
      account.deposit(5, 'description');
      expect(account.balance).toBe(15);
      expect(account.transactions.length).toBe(2);
      expect(account.transactions[1].transactionType).toBe(TransactionType.CREDIT);
    });
  });
  describe('withdraw', () => {
    it('should throw error on negative balance', () => {
      const account = new Account('1', '2', []);
      expect(account.balance).toBe(0);
      expect(() => account.withdraw(10, 'description')).toThrow(`Not enough funds to withdraw 10`);
      expect(account.balance).toBe(0);
    });
    it('should not change the balance on failed transaction', () => {
      const account = new Account('1', '2', [new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date())]);
      expect(account.balance).toBe(10);
      expect(() => account.withdraw(20, 'description')).toThrow(`Not enough funds to withdraw 20`);
      expect(account.balance).toBe(10);
    });
    it('should calculate the correct balance with previous transactions', () => {
      const account = new Account('1', '2', [new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date())]);
      expect(account.balance).toBe(10);
      account.withdraw(5, 'description');
      expect(account.balance).toBe(5);
      expect(account.transactions.length).toBe(2);
      expect(account.transactions[1].transactionType).toBe(TransactionType.DEBIT);
    });
  });
  describe('transfer', () => {
    it('should throw error on negative balance', () => {
      const account1 = new Account('1', '2', []);
      const account2 = new Account('2', '2', []);
      expect(account1.balance).toBe(0);
      expect(account2.balance).toBe(0);
      expect(() => account1.transfer(account2, 10, 'description')).toThrow(`Not enough funds to withdraw 10`);
      expect(account1.balance).toBe(0);
      expect(account2.balance).toBe(0);
    });
    it('should calculate the correct balance with previous transactions', () => {
      const account1 = new Account('1', '2', [new Transaction('1', 10, 'desc', TransactionType.CREDIT, new Date())]);
      const account2 = new Account('2', '2', []);
      expect(account1.balance).toBe(10);
      expect(account2.balance).toBe(0);
      expect(() => account1.transfer(account2, 3, 'description')).not.toThrowError();
      expect(account1.balance).toBe(7);
      expect(account2.balance).toBe(3);
      expect(account1.transactions[1].transactionType).toBe(TransactionType.DEBIT);
      expect(account1.transactions[1].value).toBe(3);
      expect(account2.transactions[0].transactionType).toBe(TransactionType.CREDIT);
      expect(account2.transactions[0].value).toBe(3);
    });
  });
});
