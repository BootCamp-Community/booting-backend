import { ApiProperty } from '@nestjs/swagger';

export class AppleLoginDto {
  code?: string;
  domain?: string;
}
export class GithubLoginDto {
  code?: string;
  domain?: string;
}
export class KakaoLoginDto {
  @ApiProperty({ description: '카카오 로그인 code 값' })
  code: string;

  @ApiProperty({ description: '프론트 URL' })
  domain: string;
}
export class NaverLoginDto {
  @ApiProperty({ description: '네이버 로그인 code 값' })
  code: string;
}
