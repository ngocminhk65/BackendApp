import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ItemModule } from 'src/item/item.module';
import { FavoriteProviders } from './entities/favorite.provider';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ...FavoriteProviders],
  imports: [AuthModule, ItemModule],
})
export class FavoritesModule {}
