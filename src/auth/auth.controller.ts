import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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

  @Get('logout')
  logout(@Req() req, @Res() res) {
    const user = req.user;
    console.log(user);
    req.logout(function (err) {
      if (err) {
        return console.log(err);
      }
      res.redirect('/api');
    });
  }
}
