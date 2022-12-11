import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleConfig } from './configs/configModule.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BoardsModule } from './boards/boards.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    DatabaseModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    BoardsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
