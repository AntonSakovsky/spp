import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Todo } from './Todo';

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.creator)
    todos: Todo[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    static fromDto(dto: RegisterDto): User {
        const user = new User();
        user.email = dto.email;
        user.password = dto.password;
        user.username = dto.username;
        return user;
    }
}
