import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

export class UpdatePostDto extends OmitType(PostEntity, [
  'viewCount',
  'shareCount',
  'selectedAnswer',
] as const) {}
