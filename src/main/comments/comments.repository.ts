import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { CommentEntity } from './comments.entity';

@CustomRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
