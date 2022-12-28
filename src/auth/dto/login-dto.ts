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
  @ApiProperty({
    description: '카카오 로그인 code 값',
    example:
      'vCQ0K0LyAoyd22LDiO_Unk70_cmRnXtkQKWjl2RiFRdd7P7fQVCEVxLwgga86YcdUzBX6Qo9cusAAAGFWKxFWA',
  })
  code: string;

  @ApiProperty({ description: '프론트 URL', example: 'http://localhost:3000' })
  domain: string;
}
export class NaverLoginDto {
  @ApiProperty({
    description: '네이버 로그인 code 값',
    example: 'QwNeW2py14qNhCJoxC',
  })
  code: string;
}
