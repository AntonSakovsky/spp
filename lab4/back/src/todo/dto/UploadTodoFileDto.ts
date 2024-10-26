import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class UploadTodoFileDto {
    @IsNumber()
    todoId: number;

    filename: string;
    filepath: string;
    bytes: number[]; 
}