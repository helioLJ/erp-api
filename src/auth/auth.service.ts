import { Injectable } from '@nestjs/common';
import { UserDetails } from './dto/User';
import { PrismaService } from 'src/prisma/prisma.service';

// const allowedUsers = ['helio.lucio.jr54@gmail.com'];

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    // if (details.email is is not in allowed users)

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
