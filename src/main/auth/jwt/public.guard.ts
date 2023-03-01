import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
// Guard는 각 Middleware 이후, Interceptors 또는 Pipes 전에 실행된다.
export class PublicAuthGuard extends AuthGuard('publicAuth') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    // 토큰이 없을 때 사용자 객체를 없는 채로 반환
    if (!token) {
      request.user = undefined;
      return true;
    }

    try {
      const user = this.authService.validateToken(token) || undefined;
      request.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
