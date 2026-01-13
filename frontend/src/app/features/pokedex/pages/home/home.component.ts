import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DxButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loading = false;

  constructor(private pokemonService: PokemonService){}

  importarPokemons(): void {
    this.loading = true;

    this.pokemonService.importPokemons().subscribe({
      next: () => {
        console.log('Pokémons importados com sucesso');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao importar pokémons', err);
        this.loading = false;
      },
    });
  }
}
