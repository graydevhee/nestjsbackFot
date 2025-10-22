/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './auth/entities/role.entity';
import { Permission } from './auth/entities/permission.entity';
import { UsersModule } from './users/users.module';
import {ConfigModule , ConfigService} from '@nestjs/config';  
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Role, Permission],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],

})
export class AppModule {}
