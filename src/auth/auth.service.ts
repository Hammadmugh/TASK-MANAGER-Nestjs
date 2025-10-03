import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signup(createAuthDto: CreateAuthDto): Promise<string> {
    try {
      const { username, password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        username,
        password: hashPassword,
      });
      await this.userRepository.save(user);
      return 'User Created';
    } catch (error) {
      throw new error();
    }
  }
  async login(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    const { username, password } = createAuthDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
