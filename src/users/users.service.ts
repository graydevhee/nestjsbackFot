import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Tiêm Repository vào
    private usersRepository: Repository<User>,
    private idCounter = 1,
    private users: User[] = [],
  ) {}
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.idCounter++,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  findAll(): Promise<User[]> {
    // Dùng trực tiếp repository đã được tiêm
    return this.usersRepository.find();
  }
  findOne(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user: User) => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
