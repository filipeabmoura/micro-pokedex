import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';
import { join } from 'path';


@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) { }

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

  async listByUser(userId: string) {
    const pokemons = await this.prismaService.client.pokemon.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
      include: {
        favorites: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    return pokemons.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      level: pokemon.level,
      imageUrl: pokemon.imageUrl,
      isFavorite: pokemon.favorites.length > 0,
    }));
  }

  async updateImage(userId: string, pokemonId: string, imagePath: string) {
    const pokemon = await this.prismaService.client.pokemon.findFirst({
      where: { id: pokemonId, userId },
    });

    if (!pokemon) {
      throw new BadRequestException('Pokémon não encontrado');
    }

    return this.prismaService.client.pokemon.update({
      where: { id: pokemonId },
      data: { imageUrl: imagePath },
    });
  }

  async upLevel(userId: string, pokemonId: string, currentLevel: number) {
    const pokemon = await this.prismaService.client.pokemon.findFirst({
      where: { id: pokemonId, userId },
    });

    const updatedLevel = currentLevel + 1;

    if (!pokemon) {
      throw new BadRequestException('Pokémon não encontrado');
    }

    if (updatedLevel <= pokemon.level) {
      throw new BadRequestException('Level inválido');
    }


    return this.prismaService.client.pokemon.update({
      where: { id: pokemonId },
      data: { level: updatedLevel },
    });
  }

  async removeImage(userId: string, pokemonId: string) {
    const pokemon = await this.prismaService.client.pokemon.findFirst({
      where: { id: pokemonId, userId },
    });

    if (!pokemon) {
      throw new BadRequestException('Pokémon não encontrado');
    }

    if (!pokemon.imageUrl) {
      throw new BadRequestException('Este pokémon não possui imagem');
    }

    /**
     * imageUrl exemplo:
     * http://localhost:3000/uploads/1768938859431.jpg
     */

    // Extrai apenas o caminho relativo do arquivo
    const relativePath = pokemon.imageUrl.replace(
      /^https?:\/\/[^/]+/i,
      ''
    );

    // Monta o caminho físico no disco
    const filePath = join(
      process.cwd(),
      relativePath.replace(/^\//, '')
    );

    // Remove o arquivo físico (se existir)
    try {
      await unlink(filePath);
    } catch (err) {
      console.warn('Arquivo não encontrado no disco:', filePath);
    }

    // Atualiza o banco
    return this.prismaService.client.pokemon.update({
      where: { id: pokemonId },
      data: { imageUrl: null },
    });
  }

}
