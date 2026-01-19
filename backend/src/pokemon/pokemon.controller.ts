import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { PokemonService } from './pokemon.service';

@Controller('pokemons')
@UseGuards(AuthGuard('jwt'))
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Post('import')
    async importAll(@Req() req) {
        const userId = req.user.sub;
        return this.pokemonService.importAllForUser(userId);
    }

    @Get()
    async list(@Req() req) {
        const userId = req.user.sub;
        return this.pokemonService.listByUser(userId);
    }

    @Post(':pokemonId/image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (_, file, cb) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    cb(null, uniqueName);
                },
            }),
            limits: {
                fileSize: 2 * 1024 * 1024, // 2MB
            },
            fileFilter(_, file, cb) {
                const allowedExt = ['.png', '.jpg', '.jpeg', '.webp'];

                if (
                    !file.mimetype.startsWith('image/') ||
                    !allowedExt.includes(extname(file.originalname).toLowerCase())
                ) {
                    return cb(
                        new BadRequestException('Apenas imagens são permitidas'),
                        false,
                    );
                }

                cb(null, true);
            },
        }),
    )
    async uploadImage(
        @Req() req,
        @Param('pokemonId') pokemonId: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) {
            throw new BadRequestException('Arquivo não enviado');
        }

        return this.pokemonService.updateImage(
            req.user.sub,
            pokemonId,
            `/uploads/${file.filename}`
        );
    }

    @Patch('uplevel/:pokemonId')
    @UseGuards(AuthGuard('jwt'))
    async favorite(@Req() req, @Param('pokemonId') pokemonId: string, @Body('level') currentLevel: number){
        const userId = req.user.sub;
        return this.pokemonService.upLevel(userId, pokemonId, currentLevel);
    }
}
