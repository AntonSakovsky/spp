import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class UploadTodoFileDto {
    @Transform(({value}) => Number(value))
    @IsNumber()
    todoId: number;
}