import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../comments.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends PickType(CommentEntity, ['parentId', 'content']) {
  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsString()
  content: string;
}
