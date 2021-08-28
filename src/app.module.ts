import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule.forRoot({
    pinoHttp: {
      prettyPrint: process.env.NODE_ENV !== 'production',
    }
  }), CommonModule, AuthModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
