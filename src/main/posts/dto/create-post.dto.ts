import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

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
] as const) {}
