import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class AuthService {
  async loginKakao(params: { code: string; domain: string }) {
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

      if (response.status === 200) {
        // TODO: 토큰을 이용해서 우리 DB에 회원이 있는지 조회
        // 있으면 로그인, 없으면 신규 가입 로직 개발
        console.log('kakao token', response.data);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
