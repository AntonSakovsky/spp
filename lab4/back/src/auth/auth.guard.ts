import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestWithUserInfo } from './types/RequestWithUserInfo';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserDto } from 'src/user/dto/UserDto';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Socket & {user: UserDto} = context.switchToWs().getClient();
        const token = request.handshake.auth.token;
        if (!token) {
            throw new WsException('Invalid token');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
        } catch (error) {
            Logger.error(error.message);
            throw new WsException('Invalid token');
        }
        console.log('token ok');
        return true;
    }

    extractTokenFromHeaders(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}
