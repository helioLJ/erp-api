import { Injectable } from '@nestjs/common';
import { UserDetails } from './dto/User';
import { PrismaService } from 'src/prisma/prisma.service';

// const allowedUsers = ['helio.lucio.jr54@gmail.com'];

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
  }
}
