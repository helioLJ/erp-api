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

    if (user) return { ...user, role: allowedEmail.role };

    const newUser = await this.prisma.user.create({
      data: {
        displayName: details.displayName,
        email: details.email,
        profilePicture: details.profilePicture,
      },
    });

    if (allowedEmail.role === 'Student')
      await this.prisma.student.create({ data: { userId: newUser.id } });

    // if (allowedEmail.role === 'Teacher')
    // await this.studentService.create(newUser.id);

    return { ...newUser, role: allowedEmail.role };
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
