import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
