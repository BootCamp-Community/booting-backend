import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  readonly id: number;
  readonly boardId: number;
  readonly hashtags: string;

  @IsNotEmpty()
  readonly title: string;
  readonly content: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly authorType: string; // 글쓴이 타입이 실명 or 필명

  readonly deleted: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}
