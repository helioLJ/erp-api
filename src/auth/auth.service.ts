import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDetails } from './dto/User';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    const allowedEmail = await this.prisma.allowedEmails.findFirst({
      where: {
        email: details.email,
      },
    });

    if (!allowedEmail) {
      throw new HttpException(
        'Seu email não está autorizado para login.',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    if (user) return user;

    const newUser = await this.prisma.user.create({
      data: {
        displayName: details.displayName,
        email: details.email,
        profilePicture: details.profilePicture,
      },
    });

    return newUser;
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
