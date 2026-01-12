import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 MUITO importante
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
