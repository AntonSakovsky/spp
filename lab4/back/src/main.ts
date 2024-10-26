import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:5173',
    });

    await app.listen(3000);
}
bootstrap();
