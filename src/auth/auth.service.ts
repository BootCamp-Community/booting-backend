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
import { Payload } from './jwt/jwt.payload';

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

  async loginNaver(params: { code: string }): Promise<any> {
    const { code } = params;

    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;
    const state = 'NAVER_LOGIN_TEST';
    const naverTokenUrl = `https://nid.naver.com/oauth2.0/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&state=${state}&code=${code}`;
    const naverUserInfoUrl = `https://openapi.naver.com/v1/nid/me`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };

    try {
      const response = await axios({
        method: 'POST',
        url: naverTokenUrl,
        timeout: 30000,
        headers,
      });

      if (response.status !== 200) {
        throw new UnauthorizedException('Login 실패');
      }

      const userInfoResponse = await axios({
        method: 'GET',
        url: naverUserInfoUrl,
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
        break;
      }
      case 'naver': {
        const { code } = params.naverLoginDto;

        if (!code) return;

        loginInfo = await this.loginNaver({ code });

        if (!loginInfo.response.id) {
          throw new BadRequestException('네이버 로그인에 실패하였습니다.');
        }
        break;
      }
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
        const { id: kid, kakao_account: kakao } = loginDto;
        let findUser: UserEntity = await this.usersService.findByFields({
          where: { kid },
        });

        if (!findUser) {
          const newUser = new UserEntity();
          newUser.kid = kid;
          newUser.name = kakao.profile?.nickname;
          newUser.nickname = kakao.profile?.nickname;
          newUser.email = kakao.has_email ? kakao.email : null;
          newUser.age = kakao.has_age_range ? kakao.age_range : null;

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
      case 'naver': {
        const { response: naver } = loginDto;
        const nid = naver.id;

        let findUser: UserEntity = await this.usersService.findByFields({
          where: { nid },
        });

        if (!findUser) {
          const newUser = new UserEntity();
          newUser.nid = nid;
          newUser.name = naver.name ? naver.name : naver.nickname;
          newUser.nickname = naver.nickname;
          newUser.email = naver.email;
          newUser.age = naver.age ? naver.age : null;
          newUser.phone = naver.mobile ? naver.mobile : null;

          findUser = await this.usersService.register({
            category: 'naver',
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
      case 'google':
      case 'apple':
      case 'github':
      default:
        break;
    }

    throw new UnauthorizedException('로그인에 실패하였습니다.');
  }

  async tokenValidateUser(payload: Payload): Promise<UserEntity | undefined> {
    return await this.usersService.findByFields({
      where: { id: payload.id },
    });
  }
}
