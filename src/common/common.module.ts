import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { KnexRepository, KnexService } from './knex';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
    imports: [
      LoggerModule.forRoot({
        pinoHttp: {
          prettyPrint: process.env.NODE_ENV !== 'production',
        }
      }),
    ],
    providers: [KnexService, KnexRepository],
    exports: [KnexService, KnexRepository]
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
