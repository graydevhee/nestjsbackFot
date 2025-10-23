import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Import TypeOrmModule
import { User } from './entities/user.entity'; // 2. Import User Entity
@Module({
  imports: [TypeOrmModule.forFeature([User])], // 3. Thêm import này
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 4. Thêm export này
})
export class UsersModule {}
