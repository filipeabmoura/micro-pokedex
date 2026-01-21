import { Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService){}

    @Post(':pokemonId')
    @UseGuards(AuthGuard('jwt'))
    async favorite(@Req() req, @Param('pokemonId') pokemonId: string){
        const userId = req.user.sub;
        return this.favoriteService.add(userId, pokemonId);
    }

    @HttpCode(204)
    @Delete(':pokemonId')
    @UseGuards(AuthGuard('jwt'))
    async unfavorite(@Req() req, @Param('pokemonId') pokemonId: string){
        const userId = req.user.sub;
        return this.favoriteService.remove(userId, pokemonId);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async list(@Req() req){
        const userId = req.user.sub;
        return this.favoriteService.list(userId);
    }
}
