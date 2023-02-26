import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseTokenDto {
  @ApiProperty({
    description: '액세스 토큰',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IuygleuztOqyvSIsImlhdCI6MTY3MjIyODY3OSwiZXhwIjoxNjcyMjMyMjc5fQ.iZO9F0k9TWm0LKsdzNXBQTq0FpDVLzorJGnibg5HbIU',
  })
  @IsString()
  access_token: string;

  @ApiProperty({ description: '메시지', example: 'success' })
  @IsString()
  message: string;
}
