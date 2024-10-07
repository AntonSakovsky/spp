import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { User } from 'src/entities/User';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(registerDto: RegisterDto) {
        const user = User.fromDto(registerDto);

        const hashedPassword = await bcrypt.hash(registerDto.password, 12);

        user.password = hashedPassword;

        try {
            const existingUser = await this.getByEmail(registerDto.email);
            if (existingUser) {
                throw new Error('User exists');
            }
            const createdUser = await this.userRepository.save(user);

            return createdUser;
        } catch (error) {
            throw new BadRequestException(
                `User with email "${registerDto.email}" already exist`,
            );
        }
    }
    async getById(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id });

            return user;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getByEmail(email: string) {
        try {
            const user = await this.userRepository.findOneBy({ email });

            return user;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }
}
