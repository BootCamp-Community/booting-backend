import { ApiProperty } from '@nestjs/swagger';

export class GetPostsDto {
  @ApiProperty({ description: '게시판 이름' })
  boardName: string;
  @ApiProperty({ description: 'limit' })
  limit: number;
  @ApiProperty({ description: 'offset' })
  offset: number;
}
