import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin() {
    return { msg: 'google login' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'handle redirect' };
  }
}
