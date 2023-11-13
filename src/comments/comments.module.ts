import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentProvider } from './entities/comment.provider';
import { ItemProvider } from 'src/item/entities/item.provider';
import { ItemModule } from 'src/item/item.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ItemModule, AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...CommentProvider],
  exports: [CommentsService],
})
export class CommentsModule {}
