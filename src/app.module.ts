import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './auth/entities/role.entity';
import { Permission } from './auth/entities/permission.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // <-- DÒNG QUAN TRỌNG NHẤT GÂY RA LỖI
      host: 'localhost',
      port: 5432,
      username: 'admin', // Thay bằng username của bạn
      password: 'admin', // Thay bằng password của bạn
      database: 'admin', // Thay bằng database của bạn
      //
      entities: [User, Role, Permission],
      synchronize: true,
    }),
    UsersModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
