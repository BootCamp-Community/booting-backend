import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { AuthModule } from 'src/main/auth/auth.module';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { PostRepository } from './posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmExModule.forCustomRepository([PostRepository]),
    AuthModule,
  ],
  providers: [ConfigService, PostsService],
  controllers: [PostsController],
})
export class PostsModule {
}
