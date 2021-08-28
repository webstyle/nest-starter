import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common';
import { AuthModule } from '../auth';
import { SharedModule } from '../shared';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    CommonModule,
    SharedModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
