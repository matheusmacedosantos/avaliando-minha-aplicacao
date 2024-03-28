/** nestjs */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/** entity */
import { User } from '.prisma/client';

/* services */
import { PrismaService } from 'src/prisma.service';
////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user.
   * @param email - user email
   * @returns {Promise<User>} new user
   * @throws {UnauthorizedException} if email already exists
   */
  async create(email: string, company: string): Promise<User> {
    // check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        companyIdentifier: `${email}|${company}`,
      },
    });

    if (existingUser) {
      return;
    }

    const user = await this.prisma.user.create({
      data: {
        email: email,
        companyIdentifier: `${email}|${company}`
      },
    });

    return user;
  }

  /**
   * Returns user profile.
   * @param email - user email
   * @returns {Promise<User>} user profile
   * @throws {NotFoundException} if user not found
   */
  async profiles(email: string): Promise<User[]> {
    // Encontrar o usuário pelo ID
    const user = await this.prisma.user.findMany({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
