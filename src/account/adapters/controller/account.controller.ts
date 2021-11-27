import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Account } from '../../core/domain/account';
import { AccountService, AccountServiceInjectionToken } from '../../core/ports/account.service';
import { CreateAccountViewModel } from './viewmodel/create-account.viewmodel';
import { TransactionViewModel } from './viewmodel/transaction.viewmodel';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountServiceInjectionToken)
    private accountService: AccountService,
  ) {}

  @Get()
  public list(): Promise<Account[]> {
    return this.accountService.listAccounts();
  }

  @Get(':accountId')
  public getOne(@Param('accountId') accountId: string): Promise<Account> {
    return this.accountService.getAccount(accountId);
  }

  @Post()
  public createNew(@Body() payload: CreateAccountViewModel): Promise<Account> {
    return this.accountService.createNew(payload.clientId);
  }

  @Post(':accountId/deposit')
  public deposit(@Param('accountId') accountId: string, @Body() payload: TransactionViewModel): Promise<void> {
    return this.accountService.deposit(accountId, payload.value, payload.description);
  }

  @Post(':accountId/withdraw')
  public withdraw(@Param('accountId') accountId: string, @Body() payload: TransactionViewModel): Promise<void> {
    return this.accountService.withdraw(accountId, payload.value, payload.description);
  }

  @Post(':originAccountId/transferTo/:destinationAccountId')
  public transferTo(
    @Param('originAccountId') originAccountId: string,
    @Param('destinationAccountId') destinationAccountId: string,
    @Body() payload: TransactionViewModel,
  ): Promise<void> {
    return this.accountService.transfer(originAccountId, destinationAccountId, payload.value, payload.description);
  }
}
