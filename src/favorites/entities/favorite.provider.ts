import { Favorite } from './favorite.entity';

export const FavoriteProviders = [
  {
    provide: 'FAVORITE_REPOSITORY',
    useValue: Favorite,
  },
];
