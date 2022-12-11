import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  readonly id: number;
  readonly boardId: number;
  readonly hashtags: string;

  @IsNotEmpty()
  readonly title: string;
  readonly content: string;
  readonly viewCnt: number; // 조회 수

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly authorType: string; // 글쓴이 타입이 실명 or 필명

  readonly deleted: number;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;

  // 일반 게시글에서는 좋아요/싫어요, Q&A 게시글에서는 도움돼요/필요하지않아요
  readonly like: number;
  readonly dislike: number;

  readonly shareCnt: number;

  // 채택된 답변(댓글) ID
  readonly selected: number;
}
