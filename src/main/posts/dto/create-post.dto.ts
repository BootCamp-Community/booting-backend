import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../posts.entity';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto extends PickType(PostEntity, [
  'boardId',
  'hashtags',
  'title',
  'content',
  'userType',
  'isAlarm',
  'parentPostId',
]) {
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

  @IsBoolean()
  @IsOptional()
  isAlarm: boolean;

  @IsNumber()
  @IsOptional()
  parentPostId: number;
}
