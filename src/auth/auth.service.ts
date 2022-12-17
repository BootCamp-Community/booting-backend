import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as qs from 'qs';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AppleLoginDto } from './dto/apple-login-dto';
import { GithubLoginDto } from './dto/github-login-dto';
import { GoogleLoginDto } from './dto/google-login-dto';
import { KakaoLoginDto } from './dto/kakao-login-dto';
import { NaverLoginDto } from './dto/naver-login-dto';
import { Payload } from './security/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginKakao(params: { code: string; domain: string }): Promise<any> {
    const { code, domain } = params;

    const kakaoRestApiKey = process.env.KAKAO_LOGIN_REST_API_KEY;
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoRestApiKey,
      redirect_uri: `${domain}/kakao-callback`,
      code,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };

    try {
      const response = await axios({
        method: 'POST',
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      });

      if (response.status !== 200) {
        throw new UnauthorizedException('Login 실패');
      }

      const userInfoResponse = await axios({
        method: 'GET',
        url: kakaoUserInfoUrl,
        timeout: 30000,
        headers: {
          ...headers,
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      return userInfoResponse.data;
    } catch (error) {
      console.error(error);
    }
  }

  async oAuthLogin(params: {
    category: string;
    kakaoLoginDto?: KakaoLoginDto;
    naverLoginDto?: NaverLoginDto;
    googleLoginDto?: GoogleLoginDto;
    appleLoginDto?: AppleLoginDto;
    githubLoginDto?: GithubLoginDto;
  }): Promise<any> {
    const { category } = params;

    let loginInfo;
    switch (category) {
      case 'kakao': {
        const { code, domain } = params.kakaoLoginDto;

        if (!code || !domain) return;

        loginInfo = await this.loginKakao({ code, domain });

        if (!loginInfo.id) {
          throw new BadRequestException('카카오 로그인에 실패하였습니다.');
        }
      }
      case 'naver':
      case 'google':
      case 'apple':
      case 'github':
      default:
        break;
    }

    return loginInfo;
  }

  async login(params: { category: string; loginDto: any }): Promise<any> {
    const { category, loginDto } = params;

    switch (category) {
      case 'kakao': {
        const { id: kid, kakao_account: kakaoAccount } = loginDto;
        let findUser: UserEntity = await this.usersService.findByFields({
          where: { kid },
        });

        if (!findUser) {
          const newUser = new UserEntity();
          newUser.kid = kid;
          newUser.name = kakaoAccount.profile?.nickname;
          newUser.nickname = kakaoAccount.profile?.nickname;
          newUser.email = kakaoAccount.has_email ? kakaoAccount.email : null;
          newUser.age = kakaoAccount.has_age_range
            ? kakaoAccount.age_range
            : null;

          findUser = await this.usersService.register({
            category: 'kakao',
            newUser,
          });
        }

        const payload: Payload = {
          id: findUser.id,
          name: findUser.name,
        };

        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
      case 'naver':
      case 'google':
      case 'apple':
      case 'github':
      default:
        break;
    }

    throw new UnauthorizedException('로그인에 실패하였습니다.');
  }
}
