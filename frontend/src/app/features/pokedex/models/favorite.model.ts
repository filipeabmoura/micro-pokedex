// src/app/models/favorite.model.ts
import { Pokemon } from './pokemon.model';

export interface Favorite {
  id: string;           // id do favorite
  userId: string;
  pokemonId: string;
  createdAt: string;
  pokemon: Pokemon;     // pokemon relacionado
}
