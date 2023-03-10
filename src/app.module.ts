import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleConfig } from './configs/configModule.config';
import { UsersModule } from './main/users/users.module';
import { PostsModule } from './main/posts/posts.module';
import { CommentsModule } from './main/comments/comments.module';
import { BoardsModule } from './main/boards/boards.module';
import { NotificationsModule } from './main/notifications/notifications.module';
import { DatabaseModule } from './configs/database.module';
import { ReportsModule } from './main/reports/reports.module';
import { AuthModule } from './main/auth/auth.module';
import { VotesModule } from './main/votes/votes.module';
import { PostRepository } from './main/posts/posts.repository';
import { BlockUsersModule } from './main/block-users/block-users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    UsersModule,
    PostsModule,
    CommentsModule,
    BoardsModule,
    NotificationsModule,
    DatabaseModule,
    ReportsModule,
    AuthModule,
    VotesModule,
    PostRepository,
    BlockUsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
