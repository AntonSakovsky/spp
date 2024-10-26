import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'RefreshTokens' })
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    token: string;

    @Column({type: 'datetime'})
    expires: Date;
}
