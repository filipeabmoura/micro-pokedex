import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PokemonService } from './pokemon.service';

@Controller('pokemons')
@UseGuards(AuthGuard('jwt'))
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService){}

    @Post('import')
    async importAll(@Req() req){
        const userId = req.user.sub;
        return this.pokemonService.importAllForUser(userId);
    }
}
