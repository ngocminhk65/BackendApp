import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ItemProvider } from './entities/item.provider';

@Module({
  imports : [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemService,
  ...ItemProvider],
})
export class ItemModule {}
