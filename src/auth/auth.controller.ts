import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  handleLogin() {
    return { msg: 'google login' };
  }

  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'handle redirect' };
  }
}
