import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

export class UpdatePostDto extends OmitType(PostEntity, [
  'viewCount',
  'shareCount',
  'selectedAnswer',
  'isAnswer',
  'parentPostId',
  'createIp',
  'deleted',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
