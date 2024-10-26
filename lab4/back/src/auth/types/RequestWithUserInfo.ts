import { Request } from 'express';
import { UserDto } from 'src/user/dto/UserDto';

export interface RequestWithUserInfo extends Request {
    user: UserDto;
}