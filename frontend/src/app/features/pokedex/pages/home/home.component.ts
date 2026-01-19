import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DxButtonModule, DxDataGridModule, DxTemplateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService: PokemonService) { }

  pokemons: Pokemon[] = [];
  hasImported = false;
  loading = false;

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true

    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
        this.hasImported = this.pokemons.length > 0;
        console.log('Pokémons do usuários buscados com sucesso');
      },
      error: err => {
        this.loading = false;
        console.error(err)
      }
    });
  }

  importarPokemons(): void {
    this.loading = true;

    this.pokemonService.importPokemons().subscribe({
      next: () => {
        console.log('Pokémons importados com sucesso');
        this.loadPokemons();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao importar pokémons', err);
        this.loading = false;
      },
    });
  }

  toggleFavorite(pokemon: Pokemon): void {
    if (pokemon.isFavorite) {
      this.pokemonService.unFavorite(pokemon.id).subscribe({
        next: () => {
          pokemon.isFavorite = false,
            console.log('Pokemon desfavoritado!')
          console.log(pokemon.isFavorite);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.pokemonService.favorite(pokemon.id).subscribe({
        next: () => {
          pokemon.isFavorite = true
          console.log('Pokemon favoritado!')
          console.log(pokemon.isFavorite);
        },
        error: (err) => console.error(err),
      });
    }
  }

  onFavoriteClick = (e: any): void => {
    console.log(e.row.data)
    const pokemon = e.row.data as Pokemon;
    this.toggleFavorite(pokemon)
  }
}
