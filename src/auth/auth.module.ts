/* eslint-disable prettier/prettier */
// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module'; // 1. Import UsersModule
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
@Module({
  imports: [
    // 1. Import UsersModule để AuthSevice có thể dùng UserService
    UsersModule,
    TypeOrmModule.forFeature([Role, Permission]),
    // 2. Cấu hình Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // 3. Cấu hình JwtModule động (để đọc secret từ .env)
    JwtModule.registerAsync({
      imports: [ConfigModule], // Phải import ConfigModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Đọc secret từ .env
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN', '3600'), 10), // Ví dụ: 1 giờ
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Chúng ta sẽ thêm JwtStrategy ở bước sau
  exports: [AuthService, PassportModule, JwtModule], // Export để dùng ở nơi khác
})
export class AuthModule {}