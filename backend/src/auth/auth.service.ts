import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    async register(email: string, password: string) {
        const userExists = await this.prisma.client.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new ConflictException('E-mail já cadastrado');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.client.user.create({
            data: {
                email,
                password: passwordHash,
            },
        });

        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(email: string, password: string){
        const user = await this.prisma.client.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Credenciais Inválidas');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return{
            accessToken: this.jwtService.sign(payload),
        };
    }
}
