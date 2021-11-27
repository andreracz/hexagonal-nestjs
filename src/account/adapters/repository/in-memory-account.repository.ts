import { Injectable } from '@nestjs/common';
import { Account } from '../../core/domain/account';
import { AccountRepository } from '../../core/ports/account.repository';

@Injectable()
export class InMemoryAccountRepository implements AccountRepository {
  async save(account: Account): Promise<Account> {
    for (let index = 0; index < this._accounts.length; index++) {
      const internalAccount = this._accounts[index];
      if (internalAccount.accountId == account.accountId) {
        this._accounts[index] = account;
        return account;
      }
    }
    this._accounts.push(account);
    return account;
  }

  async list(): Promise<Account[]> {
    return [...this._accounts];
  }

  async getOne(accountId: string): Promise<Account> {
    for (const account of this._accounts) {
      if (account.accountId == accountId) {
        return account;
      }
    }
    return null;
  }
  private _accounts: Account[] = [];
}
