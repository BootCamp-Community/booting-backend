export class CreateUserDto {
  // OAuth2.0 아이디 종류
  readonly nid: number;
  readonly kid: number;
  readonly aid: number;
  readonly gid: number;

  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  readonly level: number;
  readonly photo: string;
  readonly phone: number;
  readonly age: number;
}
