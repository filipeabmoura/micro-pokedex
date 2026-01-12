import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  async importAllForUser(userId: string) {
    const alreadyImported =
      await this.prismaService.client.pokemon.findFirst({
        where: { userId },
      });

    if (alreadyImported) {
      throw new BadRequestException(
        'Pokémons já importados para esse usuário',
      );
    }

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';

    const pokemonsToCreate: Prisma.PokemonCreateManyInput[] = [];

    while (url) {
      const { data } = await axios.get(url);

      for (const item of data.results) {
        pokemonsToCreate.push({
          name: item.name,
          userId,
        });
      }

      url = data.next;
    }

    await this.prismaService.client.pokemon.createMany({
      data: pokemonsToCreate,
      skipDuplicates: true,
    });

    return { imported: pokemonsToCreate.length };
  }
}
