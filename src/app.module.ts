import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { QuestionsController } from './questions/questions.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController, BoardsController, QuestionsController],
  providers: [],
})
export class AppModule {}
