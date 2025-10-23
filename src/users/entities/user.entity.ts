/* eslint-disable prettier/prettier */
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

  @Column({ select: false })
  password: string;

  @Column({ type: 'simple-array', nullable: true }) // Sử dụng 'simple-array' cho mảng string đơn giản
  permission_group: string[];

  @Column({ unique: true, nullable: true })
  paypal: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ nullable: true })
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
};