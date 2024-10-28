import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { TodoCreateDto } from 'src/todo/dto/TodoCreateDto';
import { Comment } from './Comment';
import { User } from './User';

export enum TodoStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in progress',
    DONE = 'done',
}

@Entity({ name: 'Todos' })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column({ type: 'date', nullable: true })
    deadline: Date;

    @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.TODO })
    status: TodoStatus;

    @Column()
    order: number;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Comment, (comment) => comment.todo, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    comments: Comment[];

    @ManyToOne(() => User, (user) => user, {
        eager: true
    })
    creator: User;

    static fromCreateDto(dto: TodoCreateDto): Todo {
        const todo = new Todo();
        todo.status = dto.status;
        todo.task = dto.task;
        todo.order = dto.order;
        return todo;
    }
}
