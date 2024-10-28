import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './Todo';
import { User } from './User';

@Entity({ name: 'Comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    message: string;

    @Column({nullable: true})
    filename: string;

    @Column({nullable: true})
    filepath: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Todo, (todo) => todo.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    todo: Todo;
}

