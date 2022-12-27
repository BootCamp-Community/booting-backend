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
import {
  AppleLoginDto,
  GithubLoginDto,
  KakaoLoginDto,
  NaverLoginDto,
} from './dto/login-dto';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginKakao(params: KakaoLoginDto): Promise<any> {
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
  }

  async loginNaver(params: NaverLoginDto): Promise<any> {
    const { code } = params;

    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;
    const state = 'NAVER_LOGIN_TEST';
    const naverTokenUrl = `https://nid.naver.com/oauth2.0/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&state=${state}&code=${code}`;
    const naverUserInfoUrl = `https://openapi.naver.com/v1/nid/me`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };

    const response = await axios({
      method: 'POST',
      url: naverTokenUrl,
      timeout: 30000,
      headers,
    });

    if (response.status !== 200 || response.data.error) {
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
  }

  async oAuthLogin(params: {
    provider: string;
    kakaoLoginDto?: KakaoLoginDto;
    naverLoginDto?: NaverLoginDto;
    appleLoginDto?: AppleLoginDto;
    githubLoginDto?: GithubLoginDto;
  }): Promise<any> {
    const { provider } = params;

    let loginInfo;
    switch (provider) {
      case 'kakao': {
        const { code, domain } = params.kakaoLoginDto;

        if (!code || !domain) return;

        loginInfo = await this.loginKakao({ code, domain });

        if (!loginInfo || !loginInfo.id) {
          throw new BadRequestException('카카오 로그인에 실패하였습니다.');
        }
        break;
      }
      case 'naver': {
        const { code } = params.naverLoginDto;

        if (!code) return;

        loginInfo = await this.loginNaver({ code });

        if (!loginInfo || !loginInfo.response?.id) {
          throw new BadRequestException('네이버 로그인에 실패하였습니다.');
        }
        break;
      }
      case 'apple':
      case 'github':
      default:
        break;
    }

    return loginInfo;
  }

  async login(params: { provider: string; loginDto: any }): Promise<any> {
    const { provider, loginDto } = params;

    switch (provider) {
      case 'kakao': {
        const { id: oAuthId, kakao_account: kakao } = loginDto;
        let findUser: UserEntity = await this.usersService.findByFields({
          where: { oAuthId },
        });

        if (!findUser) {
          const newUser = new UserEntity();
          newUser.oAuthId = oAuthId;
          newUser.provider = 'kakao';
          newUser.name = kakao.profile?.nickname;
          newUser.nickname = kakao.profile?.nickname;
          newUser.email = kakao.has_email ? kakao.email : null;
          newUser.age = kakao.has_age_range ? kakao.age_range : null;

          findUser = await this.usersService.register(newUser);
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
        const oAuthId = naver.id;

        let findUser: UserEntity = await this.usersService.findByFields({
          where: { oAuthId },
        });

        if (!findUser) {
          const newUser = new UserEntity();
          newUser.oAuthId = oAuthId;
          newUser.provider = 'naver';
          newUser.name = naver.name ? naver.name : naver.nickname;
          newUser.nickname = naver.nickname;
          newUser.email = naver.email;
          newUser.age = naver.age ? naver.age : null;
          newUser.phone = naver.mobile ? naver.mobile : null;

          findUser = await this.usersService.register(newUser);
        }

        const payload: Payload = {
          id: findUser.id,
          name: findUser.name,
        };

        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
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
