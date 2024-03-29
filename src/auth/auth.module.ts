import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './controllers/auth.controller';

@Module({
    controllers: [],
    imports: [CommonModule]
})
export class AuthModule {}
