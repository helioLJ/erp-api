import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin(@Req() req) {
    return {
      status: HttpStatus.OK,
      data: {
        user: req.user,
        message: 'Google Login was sucessful',
      },
    };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect(@Req() req) {
    return {
      status: HttpStatus.OK,
      data: {
        user: req.user,
        message: 'Google Login was sucessful',
      },
    };
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout(function (err) {
      if (err) {
        return console.log(err);
      }
      res.redirect('/api');
    });
  }
}
