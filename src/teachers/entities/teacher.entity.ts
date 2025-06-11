import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Teacher {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    teacher_name: string;

    @Column({ type: 'varchar', unique: true, length:50 })
    teacher_email: string;

    @Column({ type: 'varchar',  length: 20 })
    teacher_phoneNumber: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updaetdAt: string;
}
