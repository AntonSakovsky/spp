import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RefreshToken } from 'src/entities/RefreshToken';
import { UserDto } from 'src/user/dto/UserDto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(RefreshToken)
        private refreshTokenRepository: Repository<RefreshToken>,
    ) {}

    async register(dto: RegisterDto) {
        try {
            const createdUser = await this.userService.create(dto);
            const userDto = new UserDto(createdUser);

            const { accessToken, refreshToken } = await this.generateUserTokens(
                { ...userDto },
            );
            await this.saveRefreshToken(refreshToken, userDto.id);

            return { user: userDto, accessToken, refreshToken };
        } catch (error) {
            throw new BadRequestException(
                `User with email "${dto.email}" is already in use`,
            );
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        try {
            const user = await this.userService.getByEmail(email);

            const isPasswordEqual = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isPasswordEqual) {
                throw new BadRequestException('Incorrect login or password');
            }

            const userDto = new UserDto(user);
            const { accessToken, refreshToken } = await this.generateUserTokens(
                { ...userDto },
            );

            await this.saveRefreshToken(refreshToken, userDto.id);

            return { user: userDto, accessToken, refreshToken };
        } catch (error) {
            throw new BadRequestException('Incorrect login or password');
        }
    }

    async logout(refreshToken: string) {
        await this.refreshTokenRepository.delete({
            token: refreshToken,
        });
    }

    async refreshTokens(token: string) {
        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        const userData = await this.validateRefreshToken(token);
        const tokenFromDb = await this.refreshTokenRepository.findOne({
            where: {
                token,
            },
        });

        if (!tokenFromDb || !userData) {
            throw new UnauthorizedException('Invalid token');
        }

        const isExpired = new Date(tokenFromDb.expires) < new Date();
        if (isExpired) {
            throw new UnauthorizedException('Invalid token');
        }

        const user = await this.userService.getById(tokenFromDb.userId);
        const userDto = new UserDto(user);
        const { accessToken, refreshToken } = await this.generateUserTokens({
            ...userDto,
        });

        await this.saveRefreshToken(refreshToken, userDto.id);

        return {
            user: userDto,
            accessToken,
            refreshToken,
        };
    }

    async generateUserTokens(user: UserDto) {
        const accessToken = await this.jwtService.signAsync(user, {
            expiresIn: '15m',
        });

        const refreshToken = await this.jwtService.signAsync(user, {
            expiresIn: '30d',
            secret: process.env.JWT_REFRESH_SECRET,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveRefreshToken(token: string, userId: number) {
        const refreshToken = await this.refreshTokenRepository.findOne({
            where: {
                userId,
            },
        });

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        if (!refreshToken) {
            await this.refreshTokenRepository.save({
                token,
                userId,
                expires: expireDate,
            });
        } else {
            refreshToken.token = token;
            refreshToken.expires = expireDate;
            await this.refreshTokenRepository.save(refreshToken);
        }
    }

    async validateRefreshToken(token: string) {
        try {
            const payload: UserDto = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            return payload;
        } catch (error) {
            return null;
        }
    }
}
