import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/user.interface';
import db from 'src/config/database';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class AuthService {
    async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
        const user = await db.selectFrom("User")
            .where('email', '=', authenticateDto.email)
            .selectAll()
            .executeTakeFirst();
        
        if (!user) throw new NotFoundException(`User with email ${authenticateDto.email} is not found`);

        if (!this.comparePassword(authenticateDto.password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        const token = sign({payload: {email: user.email, role: user.role}}, 'secret')
        return { user, token };
    }

    async register(profileDto: ProfileDto){
        const hashedPassword = this.hashPassword(profileDto.password);

        const user = await db.selectFrom("User")
            .where('email', '=', profileDto.email)
            .selectAll()
            .executeTakeFirst();
        
        if (user) throw new BadRequestException('Email is used');
        
        await db.insertInto("User")
            .values({
                email: profileDto.email,    
                name: profileDto.name,
                password: await hashedPassword,
                role: profileDto.role,
                birth_date: profileDto.birthDate,
                phoneNumber: profileDto.phoneNumber,
                locationLatitude: profileDto.locationLatitude,
                locationLongitude: profileDto.locationLongitude
            })
    }

    async hashPassword(plainText: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(plainText, salt);
        return hashPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
