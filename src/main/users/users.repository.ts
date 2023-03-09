import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { UserEntity } from './users.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserById(userId) {
    return this.createQueryBuilder('u')
      .select(['u.id', 'u.name', 'u.nickname', 'u.photo'])
      .where('u.id = :id', { id: userId })
      .getOne();
  }
}
