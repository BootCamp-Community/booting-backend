import { OmitType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';

export class UpdatePostDto extends OmitType(PostEntity, [
  'viewCnt',
  'like',
  'dislike',
  'shareCnt',
  'selected',
] as const) {}
