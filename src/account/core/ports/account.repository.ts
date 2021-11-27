import { Account } from '../domain/account';

export const AccountRepositoryInjectionToken = 'AccountRepository';

export interface AccountRepository {
  save(account: Account): Promise<Account>;
  list(): Promise<Account[]>;
  getOne(accountId: string): Promise<Account>;
}
