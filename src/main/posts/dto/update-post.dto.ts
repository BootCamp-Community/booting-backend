import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PickType(PostEntity, ['boardId', 'hashtags', 'title', 'content', 'userType', 'parentPostId']) {
  @IsNumber()
  boardId: number;

  @IsArray()
  @IsOptional()
  hashtags: string[];

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  userType: string;

  @IsNumber()
  @IsOptional()
  parentPostId: number;
}
