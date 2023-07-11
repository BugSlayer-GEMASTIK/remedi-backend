import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/user.interface';
import db from 'src/config/database';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class AuthService {
  async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
    const user = await db
      .selectFrom('User')
      .where('email', '=', authenticateDto.email)
      .selectAll()
      .executeTakeFirst();

    if (!user)
      throw new NotFoundException(
        `User with email ${authenticateDto.email} is not found`,
      );

    if (!this.comparePassword(authenticateDto.password, user.password)) {
      throw new BadRequestException('Invalid password');
    }

    const expiresIn = '1h';
    const token = sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn },
    );
    return { user, token };
  }

  async register(profileDto: ProfileDto) {
    const {
      email,
      password,
      locationLatitude,
      locationLongitude,
      name,
      phoneNumber,
      birthDate,
      role,
    } = profileDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await db
      .selectFrom('User')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (user) throw new BadRequestException('Email is used');

    const location = await db
      .selectFrom('Location')
      .selectAll()
      .where('latitude', '=', locationLatitude)
      .where('longitude', '=', locationLongitude)
      .executeTakeFirst();

    if (!location) {
      await db
        .insertInto('Location')
        .values({
          latitude: locationLatitude,
          longitude: locationLongitude,
        })
        .execute();
    }

    db.insertInto('User')
      .values({
        email: email,
        name: name,
        password: hashedPassword,
        role: role,
        birth_date: birthDate,
        phoneNumber: phoneNumber,
        locationLatitude: locationLatitude,
        locationLongitude: locationLongitude,
      })
      .execute();
  }

  async hashPassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(plainText, salt);
    return hashPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
