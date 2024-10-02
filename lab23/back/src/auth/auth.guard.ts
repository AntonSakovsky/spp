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

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: RequestWithUserInfo = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeaders(request);
        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
        } catch (error) {
            Logger.error(error.message);
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    extractTokenFromHeaders(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}
