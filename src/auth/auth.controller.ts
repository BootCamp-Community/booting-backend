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
import { JwtAuthGuard as AuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/kakao-login')
  async kakaoLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code, domain }: { code: string; domain: string } = body;
      if (!code || !domain) {
        throw new BadRequestException('요청 오류 입니다.');
      }

      const kakao = await this.authService.oAuthLogin({
        category: 'kakao',
        kakaoLoginDto: {
          code,
          domain,
        },
      });

      const jwt = await this.authService.login({
        category: 'kakao',
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

  @Post('/naver-login')
  async naverLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code }: { code: string } = body;
      if (!code) {
        throw new BadRequestException('요청 오류 입니다.');
      }

      const naver = await this.authService.oAuthLogin({
        category: 'naver',
        naverLoginDto: {
          code,
        },
      });

      const jwt = await this.authService.login({
        category: 'naver',
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

  @Post('/google-login')
  async googleLogin(@Body() body: any, @Response() res): Promise<any> {
    try {
      // google login
      res.send({
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/apple-login')
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

  @Post('/github-login')
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
}
