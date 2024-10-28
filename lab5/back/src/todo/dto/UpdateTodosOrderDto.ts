import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class UpdateTodosOrderDto {
    @Field(() => Int)
    @IsNumber()
    id: number;

    @Field(() => Int)
    @IsNumber()
    order: number;
}