import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsDto {
  @ApiProperty({ description: '게시판 ID' })
  @IsNumber()
  @Type(() => Number)
  board_id: number;

  @ApiProperty({ description: 'offset' })
  @IsNumber()
  @Type(() => Number)
  offset: number;

  @ApiProperty({ description: 'limit' })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
