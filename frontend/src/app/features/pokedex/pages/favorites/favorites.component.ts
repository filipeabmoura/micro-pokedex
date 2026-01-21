import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { Pokemon } from '../../models/pokemon.model';
import { Favorite } from '../../models/favorite.model';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxTemplateModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: Pokemon[] = [];
  hasFavorite = false;
  loading = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedPokemonId: string | null = null;
  selectedPokemonHasImage = false;


  constructor(private favoriteService: FavoriteService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;

    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.hasFavorite = this.favorites.length > 0;
        this.loading = false;
        console.log('Favoritos do usuários buscados com sucesso');
      },
      error: err => {
        this.loading = false;
        console.error(err)
      }
    });
  }

  removeFavorite(pokemon: Pokemon): void {
    this.favoriteService.unFavorite(pokemon.id).subscribe({
      next: () => {
        pokemon.isFavorite = false,
          console.log('Pokémon Desfavoritado!');
        console.log(pokemon.isFavorite);
        this.loadFavorites();
      },
      error: (err) => console.error(err),
    });
  }

  onUnfavoriteClick = (e: any): void => {
    console.log(e.row.data)
    const favorite = e.row.data as Favorite;
    const pokemon: Pokemon = favorite.pokemon;
    this.removeFavorite(pokemon)
  }

  upLevelPokemon(pokemon: Pokemon): void {
    this.loading = true;
    this.pokemonService.upLevelPokemon(pokemon.id, pokemon.level).subscribe({
      next: () => {
        console.log('Nível do pokémon aumementado!')
        console.log(pokemon.level);
        this.loadFavorites();
      },
      error: (err) => console.error('err'),
    });
    this.loading = false;
  }

  onUpLevelClick = (e: any): void => {
    const favorite = e.row.data as Favorite;
    const pokemon: Pokemon = favorite.pokemon;
    this.upLevelPokemon(pokemon);
  }

  onAddImageClick = (e: any): void => {
    const favorite = e.row.data as Favorite;
    this.selectedPokemonId = favorite.pokemon.id;
    this.selectedPokemonHasImage = false;
    this.fileInput.nativeElement.click();
  };

  onChangeImageClick = (e: any): void => {
    const favorite = e.row.data as Favorite;
    this.selectedPokemonId = favorite.pokemon.id;
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
      .uploadImage(
        this.selectedPokemonId,
        formData,
        this.selectedPokemonHasImage
      )
      .subscribe({
        next: () => {
          console.log('Imagem enviada com sucesso');
          this.loadFavorites();
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
    const favorite = e.row.data as Favorite;
    const pokemonId = favorite.pokemon.id;

    this.pokemonService.removeImage(pokemonId).subscribe({
      next: () => {
        console.log('Imagem removida');
        this.loadFavorites();
      },
      error: (err) => console.error(err),
    });
  };

}
