import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaModule } from './prisma/prisma.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ AuthModule, PokemonModule, PrismaModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
