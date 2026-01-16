export interface Pokemon {
    id: string;
    name: string;
    imageUrl?: string | null;
    level: number
    isFavorite: boolean;
}