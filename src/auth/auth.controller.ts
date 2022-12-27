import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Response,
} from '@nestjs/common';
import { ResponseTokenDto } from './dto/response-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { KakaoLoginDto, NaverLoginDto } from './dto/login-dto';

@ApiTags('로그인')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login/kakao')
  @ApiBody({
    type: KakaoLoginDto,
  })
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponse({
    status: 201,
    description: '카카오 로그인을 진행하고 access_token을 반환한다.',
    type: ResponseTokenDto,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  async kakaoLogin(@Body() body: KakaoLoginDto, @Response() res): Promise<any> {
    try {
      const { code, domain } = body;
      if (!code || !domain) {
        throw new BadRequestException('Bad Request');
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

      const result: ResponseTokenDto = {
        access_token: jwt.accessToken,
        message: 'success',
      };

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/login/naver')
  @ApiBody({ type: NaverLoginDto })
  @ApiOperation({ summary: '네이버 로그인' })
  @ApiResponse({
    status: 201,
    description: '네이버 로그인을 진행하고 access_token을 반환한다.',
    type: NaverLoginDto,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  async naverLogin(@Body() body: NaverLoginDto, @Response() res): Promise<any> {
    try {
      const { code } = body;
      if (!code) {
        throw new BadRequestException('Bad Request');
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
