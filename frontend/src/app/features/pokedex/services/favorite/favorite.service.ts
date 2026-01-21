import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: HttpClient){}

  private readonly API_URL = 'http://localhost:3000';

  getFavorites(): Observable<Pokemon[]>{
    return this.httpClient.get<Pokemon[]>(
      `${this.API_URL}/favorites`
    );
  }

  unFavorite(pokemonId: string){
    console.log(pokemonId)
    return this.httpClient.delete(`${this.API_URL}/favorites/${pokemonId}`);
  }
}
