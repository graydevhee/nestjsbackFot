import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.idCounter++,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    console.log(`findOne called with id: ${id}`);
    return this.users.find((user: User) => user.id === id);
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
