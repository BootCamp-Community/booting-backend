export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  readonly level: number;
  readonly photo: string;

  // TODO: OAuth2.0 관련 필드 설정할 것.
}
