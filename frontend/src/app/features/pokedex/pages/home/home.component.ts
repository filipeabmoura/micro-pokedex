import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedPokemonId: string | null = null;
  selectedPokemonHasImage = false;

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

  upLevelPokemon(pokemon: Pokemon): void {
    this.loading = true;
    this.pokemonService.upLevelPokemon(pokemon.id, pokemon.level).subscribe({
      next: () => {
        console.log('Nível do pokémon aumementado!')
        console.log(pokemon.level);
        this.loadPokemons();
      },
      error: (err) => console.error('err'),
    });
    this.loading = false;
  }

  onUpLevelClick = (e: any): void => {
    const pokemon = e.row.data as Pokemon;
    this.upLevelPokemon(pokemon);
  }

  onAddImageClick = (e: any): void => {
    this.selectedPokemonId = e.row.data.id;
    this.selectedPokemonHasImage = false;
    this.fileInput.nativeElement.click();
  };

  onChangeImageClick = (e: any): void => {
    this.selectedPokemonId = e.row.data.id;
    this.selectedPokemonHasImage = true;
    this.fileInput.nativeElement.click();
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0 || !this.selectedPokemonId) {
      return;
    }

    const file = input.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.pokemonService
      .uploadImage(this.selectedPokemonId, formData, this.selectedPokemonHasImage)
      .subscribe({
        next: () => {
          console.log('Imagem enviada com sucesso');
          this.loadPokemons();
          this.resetFileInput();
        },
        error: (err) => {
          console.error('Erro ao enviar imagem', err);
          this.resetFileInput();
        },
      });
  }

  resetFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.selectedPokemonId = null;
    this.selectedPokemonHasImage = false;
  }

  onRemoveImageClick = (e: any): void => {
    const pokemonId = e.row.data.id;

    this.pokemonService.removeImage(pokemonId).subscribe({
      next: () => {
        console.log('Imagem removida');
        this.loadPokemons();
      },
      error: (err) => console.error(err),
    });
  };


}
