import { BadRequestException } from '@nestjs/common';

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

const reportTypes = {
  post: ['욕설', '음란성', '폭력성', '사기', '도배', '기타'],
  comment: ['욕설', '음란성', '폭력성', '사기', '도배', '기타'],
};

export { targetType, validateTargetType, reportTypes };
