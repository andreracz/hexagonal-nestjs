import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { AccountController } from './account/adapters/controller/account.controller';
import { InMemoryAccountRepository } from './account/adapters/repository/in-memory-account.repository';
import { AccountRepositoryInjectionToken } from './account/core/ports/account.repository';
import { AccountServiceInjectionToken } from './account/core/ports/account.service';
import { AccountServiceImpl } from './account/core/service/account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    { provide: AccountServiceInjectionToken, useClass: AccountServiceImpl },
    {
      provide: AccountRepositoryInjectionToken,
      useClass: InMemoryAccountRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector) => new ClassSerializerInterceptor(reflector, { excludePrefixes: ['_'] }),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
