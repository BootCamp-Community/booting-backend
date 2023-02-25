import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto extends OmitType(PostEntity, [
  'viewCount',
  'shareCount',
  'selectedAnswer',
  'isAnswer',
  'parentPostId',
  'deleted',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {
  @IsNumber()
  userId;

  @IsNumber()
  boardId;

  @IsString()
  @IsOptional()
  hashtags;

  @IsString()
  title;

  @IsString()
  content;

  @IsString()
  userType;
}
