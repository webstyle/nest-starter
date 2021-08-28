import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { KnexService } from './db/knex.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
    providers: [KnexService],
    exports: [KnexService]
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
