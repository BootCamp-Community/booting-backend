import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';
import { NotificationsController } from './notifications/notifications.controller';

@Module({
  imports: [],
  controllers: [
    UsersController,
    BoardsController,
    PostsController,
    CommentsController,
    NotificationsController,
  ],
  providers: [],
})
export class AppModule {}
