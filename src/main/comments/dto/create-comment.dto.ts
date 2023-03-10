import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto extends PickType(CommentEntity, ['postId', 'parentId', 'content']) {
  @IsNumber()
  postId: number;

  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsString()
  content: string;
}
