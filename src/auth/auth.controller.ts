import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Logger } from '@nestjs/common';

@Controller('user')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    this.logger.verbose(`${createAuthDto.username} registered`);
    return this.authService.signup(createAuthDto);
  }
  @Get('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    this.logger.verbose(`${createAuthDto.username} logged in`);
    return this.authService.login(createAuthDto);
  }
}
