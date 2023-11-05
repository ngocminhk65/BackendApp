import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemModule } from './item/item.module';
<<<<<<< Updated upstream
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [DatabaseModule, ItemModule, MinioModule],
=======
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ReportModule } from './report/report.module';
import { AssigmentModule } from './assigment/assigment.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [DatabaseModule,ItemModule, AuthorModule, UserModule, CommentModule, ReportModule, AssigmentModule, PermissionModule],
>>>>>>> Stashed changes
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
