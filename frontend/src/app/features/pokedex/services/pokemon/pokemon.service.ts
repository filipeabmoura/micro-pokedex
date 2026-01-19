import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient){}

  private readonly API_URL = 'http://localhost:3000';

  importPokemons(): Observable<void>{
    return this.httpClient.post<void>(
      `${this.API_URL}/pokemons/import`, {}
    );
  }

  getPokemons(): Observable<Pokemon[]>{
    return this.httpClient.get<Pokemon[]>(
      `${this.API_URL}/pokemons`
    );
  }

  favorite(pokemonId: string){
    return this.httpClient.post(`${this.API_URL}/favorites/${pokemonId}`, null);
  }

  unFavorite(pokemonId: string){
    return this.httpClient.delete(`${this.API_URL}/favorites/${pokemonId}`);
  }

  upLevelPokemon(pokemonId: string, currentLevel: number) {
    return this.httpClient.patch(`${this.API_URL}/pokemons/uplevel/${pokemonId}`, { level: currentLevel});
  }
}
