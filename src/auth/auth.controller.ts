import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Response,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login/kakao')
  async kakaoLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code, domain }: { code: string; domain: string } = body;
      if (!code || !domain) {
        throw new BadRequestException('요청 오류 입니다.');
      }

      const kakao = await this.authService.oAuthLogin({
        provider: 'kakao',
        kakaoLoginDto: {
          code,
          domain,
        },
      });

      const jwt = await this.authService.login({
        provider: 'kakao',
        loginDto: kakao,
      });

      res.send({
        access_token: jwt.accessToken,
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/login/naver')
  async naverLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code }: { code: string } = body;
      if (!code) {
        throw new BadRequestException('요청 오류 입니다.');
      }

      const naver = await this.authService.oAuthLogin({
        provider: 'naver',
        naverLoginDto: {
          code,
        },
      });

      const jwt = await this.authService.login({
        provider: 'naver',
        loginDto: naver,
      });

      res.send({
        access_token: jwt.accessToken,
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/login/github')
  async githubLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      // github login
      res.send({
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/login/apple')
  async appleLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      // apple login
      res.send({
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
