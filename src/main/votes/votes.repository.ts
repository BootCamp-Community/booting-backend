import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { VoteEntity } from './votes.entity';

@CustomRepository(VoteEntity)
export class VoteRepository extends Repository<VoteEntity> {}
