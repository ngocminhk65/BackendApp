import { Global, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ItemProvider, PermissionProvider } from './entities/item.provider';
import { ItemChapImageProvider } from './entities/item_chap_images.provider';
import { ItemChapProvider } from './entities/item_chaps.provider';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { PermissionService } from './permission.service';

@Global()
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ItemController],
  providers: [
    PermissionService,
    ItemService,
    ...ItemProvider,
    ...ItemChapImageProvider,
    ...ItemChapProvider,
    ...PermissionProvider,
  ],
  exports: [...ItemProvider, ...ItemChapImageProvider, ...ItemChapProvider],
})
export class ItemModule {}
