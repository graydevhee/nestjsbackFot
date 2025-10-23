/* eslint-disable prettier/prettier */
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
import { NotFoundException } from '@nestjs/common'; // Import thêm
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
    user.password = " "; // Xóa password khỏi object trả về
    return user;
  }
  findAll(): Promise<User[]> {
    // Dùng trực tiếp repository đã được tiêm
    return this.usersRepository.find();
  }
  findOne(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // Không cần xóa password ở đây vì JwtStrategy sẽ làm
    return user;
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
  // eslint-disable-next-line prettier/prettier
  async findOneByUsernameWithPassword(username: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password') // Yêu cầu TypeORM lấy thêm cột password
      .getOne();
  }
}
