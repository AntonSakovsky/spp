import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { Comment } from './entities/Comment';
import { RefreshToken } from './entities/RefreshToken';
import { Todo } from './entities/Todo';
import { User } from './entities/User';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config) => ({
                type: 'mysql',
                host: config.get('db.host'),
                port: config.get('db.port'),
                username: config.get('db.username'),
                password: config.get('db.password'),
                database: config.get('db.database'),
                entities: [User, RefreshToken, Todo, Comment],
                synchronize: false,
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [config],
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            global: true,
            useFactory: async (config) => ({
                secret: config.get('jwt.secret'),
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        TodoModule,
        FileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
