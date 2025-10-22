// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto'; // Bạn tự tạo DTO này
import { RegisterDto } from './dto/register.dto'; // Bạn tự tạo DTO này
import { User } from 'src/user/user.entity'; // Giả sử entity của bạn

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // 1. Tiêm UserService
    private jwtService: JwtService,   // 2. Tiêm JwtService
  ) {}

  // --- HÀM REGISTER ---
  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    // Dùng hàm create của UserService (hàm này đã có logic hash password)
    // Bạn nên thêm logic kiểm tra username/email đã tồn tại chưa ở đây
    return this.userService.create(registerDto);
  }

  // --- HÀM LOGIN ---
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    // 1. Tìm user
    // LƯU Ý: Phải dùng queryBuilder hoặc `addSelect` để lấy cả password
    // Vì ở UserEntity chúng ta đã set `select: false`
    const user = await this.userService.findOneByUsernameWithPassword(username); // Bạn cần tự viết hàm này trong UserService

    // 2. Kiểm tra user và mật khẩu
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. Tạo JWT Payload (thông tin muốn lưu trong token)
      const payload = { username: user.username, sub: user.id };

      // 4. Ký và trả về token
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      // Nếu sai, ném lỗi
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}