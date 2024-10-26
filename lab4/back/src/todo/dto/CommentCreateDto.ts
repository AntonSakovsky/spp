import { IsNumber, IsOptional, IsString } from "class-validator";

export class CommentCreateDto {
    @IsNumber()
    todoId: number;

    @IsString()
    message: string;

}