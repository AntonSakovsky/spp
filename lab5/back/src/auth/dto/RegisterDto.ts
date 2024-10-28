import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}