import { Role } from 'src/auth/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  paypal: string;

  @Column({ unique: true })
  code: string;

  @Column()
  address: string;

  @Column({ unique: true, nullable: true })
  token: string;
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles', // Tên bảng trung gian
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
