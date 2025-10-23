// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import thêm ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// Import các module khác của bạn (AuthModule, v.v.)

@Module({
  imports: [
    // 1. Load ConfigModule LÊN ĐẦU TIÊN
    ConfigModule.forRoot({
      isGlobal: true, // Giúp ConfigService có sẵn ở mọi nơi
      envFilePath: '.env', // Chỉ định file .env
    }),

    // 2. Cấu hình TypeORM động
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để TypeOrm có thể dùng
      inject: [ConfigService], // Tiêm ConfigService vào
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Hoặc 'mysql', 'mongodb', v.v.

        // Đọc các biến từ .env bằng ConfigService
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),

        // autoLoadEntities: true sẽ tự động tìm tất cả các file .entity.ts
        // Bạn sẽ không cần mảng 'entities' nữa.
        autoLoadEntities: true,

        // synchronize: true chỉ dùng cho development.
        // Nó sẽ tự động tạo bảng dựa trên entities.
        // TRONG PRODUCTION, bạn phải tắt nó (false) và dùng 'migrations'.
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),

    // 3. Import các feature modules (UserModule giờ sẽ hoạt động)
    UsersModule,
    AuthModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
