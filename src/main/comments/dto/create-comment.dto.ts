export class CreateCommentDto {
  readonly id: number;
  readonly postId: number;
  readonly content: string;

  readonly deleted: number;
  readonly author: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  // 채택된 답변(댓글)인지 여부
  readonly selected: number;
}
