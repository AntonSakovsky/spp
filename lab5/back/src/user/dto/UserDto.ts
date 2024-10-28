import { User } from "src/entities/User";

export class UserDto {
    id: number;
    email: string;
    username: string;

    constructor(user: User){
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
    }
}
