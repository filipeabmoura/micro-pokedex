import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private readonly prismaService: PrismaService) { }

    async add(userId: string, pokemonId: string) {
        const pokemon = await this.prismaService.client.pokemon.findFirst({
            where: {
                id: pokemonId,
                userId,
            },
        });

        if (!pokemon) {
            throw new BadRequestException('Pokémon não encontrado');
        }

        const alreadyFavorited =
            await this.prismaService.client.favorite.findUnique({
                where: {
                    userId_pokemonId: {
                        userId,
                        pokemonId,
                    },
                },
            });

        if (alreadyFavorited) {
            throw new BadRequestException('Pokémon já está nos favoritos');
        }

        return this.prismaService.client.favorite.create({
            data: {
                userId,
                pokemonId,
            },
        });
    }

    async remove(userId: string, pokemonId: string) {
        const favorite =
            await this.prismaService.client.favorite.findUnique({
                where: {
                    userId_pokemonId: {
                        userId,
                        pokemonId,
                    },
                },
            });

        if (!favorite) {
            throw new BadRequestException('Favorito não encontrado');
        }

        return this.prismaService.client.favorite.delete({
            where: {
                userId_pokemonId: {
                    userId,
                    pokemonId,
                },
            },
        });
    }

    async list(userId: string) {
        return this.prismaService.client.favorite.findMany({
            where: { userId },
            include: {
                pokemon: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
