/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
    @InjectRepository(User) // Tiêm Repository vào
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Lưu hashedPassword vào database, KHÔNG phải createUserDto.password
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    user.password = undefined; // Xóa password khỏi object trả về
    return user;
  }
  findAll(): Promise<User[]> {
    // Dùng trực tiếp repository đã được tiêm
    return this.usersRepository.find();
  }
  findOne(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user: User) => user.username === username);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
