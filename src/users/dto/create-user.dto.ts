/* eslint-disable prettier/prettier */
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/auth/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNumber({}, { each: true }) // Đảm bảo mỗi phần tử trong mảng là một số
  roles: Role[]; // Chỉ cần nhận vào một mảng các ID của Role, ví dụ: [1, 3]

  @IsString()
  paypal: string;

  @IsString()
  code: string;

  @IsString()
  address: string;

  @IsString()
  token: string;
}
