export interface Pokemon {
    id: number;
    name: string;
    imageUrl?: string | null;
    level: number
    isFavorite: boolean;
}