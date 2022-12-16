import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code, domain } = body;
      if (!code || !domain) {
        throw new BadRequestException('요청 오류 입니다.');
      }

      const kakao = await this.authService.loginKakao({ code, domain });

      res.send({
        message: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
