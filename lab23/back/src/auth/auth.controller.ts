import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { user, accessToken, refreshToken } =
            await this.authService.register(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });

        return { user, accessToken };
    }

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { user, accessToken, refreshToken } =
            await this.authService.login(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });

        return { user, accessToken };
    }

    @Post('logout')
    async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies['refreshToken'];
        await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
    }

    @Post('refresh')
    async refreshTokens(
        @Req() requset: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = requset.cookies['refreshToken'];
        const { user, ...tokens } =
            await this.authService.refreshTokens(refreshToken);

        response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

        return { user, accessToken: tokens.accessToken };
    }
}
