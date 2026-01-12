import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret-muito-sigiloso',
      signOptions: {
        expiresIn: '1d'
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
