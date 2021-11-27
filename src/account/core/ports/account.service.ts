import { Account } from '../domain/account';

export const AccountServiceInjectionToken = 'AccountService';

export interface AccountService {
  deposit(accountId: string, value: number, description: string): Promise<void>;

  withdraw(accountId: string, value: number, description: string): Promise<void>;

  transfer(originAccountId: string, destinationAccountId: string, value: number, description: string): Promise<void>;

  getAccount(accountId: string): Promise<Account>;

  listAccounts(): Promise<Account[]>;

  createNew(clientId: string): Promise<Account>;
}
