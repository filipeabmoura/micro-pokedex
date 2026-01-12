import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private readonly prismaService: PrismaService){}

    async add(userId: string, pokemonId: string){
        this.prismaService.client.favorite.create({
            data: {
                userId,
                pokemonId,
            },
        });
    }

    async remove(userId: string, pokemonId: string){
        return this.prismaService.client.favorite.delete({
            where: {
                userId_pokemonId: {
                    userId,
                    pokemonId,
                },
            },
        });
    }

    async list(userId: string){
        return this.prismaService.client.favorite.findMany({
            where: { userId },
            include: {
                pokemon: true,
            },
        });
    }
}
