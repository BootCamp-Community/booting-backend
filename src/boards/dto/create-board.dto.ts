export class CreateBoardDto {
  readonly id: number;
  readonly boardType: string;
  readonly name: string;
  readonly slug: string;
  readonly auth: object; // 조회, 작성 권한과 관련된 필드

  readonly enabled: number;
  readonly createdAt: number;
  readonly updatedAt: number;
}
