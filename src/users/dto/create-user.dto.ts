/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/auth/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsArray()
  @IsNumber({}, { each: true }) // Đảm bảo mỗi phần tử trong mảng là một số
  roles: Role[]; // Chỉ cần nhận vào một mảng các ID của Role, ví dụ: [1, 3]

  @IsString()
  @IsOptional()
  paypal?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  token?: string;
}
