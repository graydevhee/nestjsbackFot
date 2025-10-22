import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'READ_USER', 'WRITE_USER'

  @Column()
  description: string; // e.g., 'Permission to read user data'
}
