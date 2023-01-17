export class CreateCommentDto {
  readonly id: number;
  readonly postId: number;
  readonly content: string;

  readonly deleted: number;
  readonly author: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  // 일반 게시글에서는 좋아요/싫어요, Q&A 게시글에서는 도움돼요/필요하지않아요
  readonly like: number;
  readonly dislike: number;

  // 채택된 답변(댓글)인지 여부
  readonly selected: number;
}
