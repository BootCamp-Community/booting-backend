import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenDto {
  @ApiProperty({ description: '액세스 토큰' })
  access_token: string;

  @ApiProperty({ description: '메시지' })
  message: string;
}
