import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { UserEntity } from './users.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
