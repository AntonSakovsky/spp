import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/entities/RefreshToken';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken]), UserModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
