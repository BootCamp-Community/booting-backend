import { BadRequestException } from '@nestjs/common';

type voteType = 'like' | 'dislike' | 'curiosity'; // 좋아요, 싫어요, 궁금해요

type targetType = 'post' | 'comment';

const validateTargetType = (targetType: targetType) => {
  switch (targetType) {
    case 'post':
    case 'comment':
      break;
    default:
      throw new BadRequestException('targetType is not valid');
  }
};

export { voteType, targetType, validateTargetType };
