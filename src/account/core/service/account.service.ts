import { Inject, NotFoundException } from '@nestjs/common';
import { Account } from '../domain/account';
import { AccountRepository, AccountRepositoryInjectionToken } from '../ports/account.repository';
import { AccountService } from '../ports/account.service';
import { v4 as uuid } from 'uuid';

export class AccountServiceImpl implements AccountService {
  constructor(
    @Inject(AccountRepositoryInjectionToken)
    private repository: AccountRepository,
  ) {}

  createNew(clientId: string): Promise<Account> {
    const newAccount = new Account(uuid(), clientId, []);
    return this.repository.save(newAccount);
  }

  async deposit(accountId: string, value: number, description: string): Promise<void> {
    const account = await this.repository.getOne(accountId);
    if (account == null) {
      throw new NotFoundException();
    }
    account.deposit(value, description);
    await this.repository.save(account);
  }
  async withdraw(accountId: string, value: number, description: string): Promise<void> {
    const account = await this.repository.getOne(accountId);
    if (account == null) {
      throw new NotFoundException();
    }
    account.withdraw(value, description);
    await this.repository.save(account);
  }
  async transfer(
    originAccountId: string,
    destinationAccountId: string,
    value: number,
    description: string,
  ): Promise<void> {
    const originAccount = await this.repository.getOne(originAccountId);
    if (originAccount == null) {
      throw new NotFoundException('Origin account not found');
    }
    const destinationAccount = await this.repository.getOne(destinationAccountId);
    if (destinationAccount == null) {
      throw new NotFoundException('Destination account not found');
    }
    originAccount.transfer(destinationAccount, value, description);
    await this.repository.save(originAccount);
    await this.repository.save(destinationAccount);
  }
  getAccount(accountId: string): Promise<Account> {
    return this.repository.getOne(accountId);
  }
  listAccounts(): Promise<Account[]> {
    return this.repository.list();
  }
}
