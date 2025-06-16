import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  student_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  student_email: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  student_registration: string;

  @BeforeInsert()
  generateRegistration() {
    this.student_registration = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
