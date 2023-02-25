import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findAll(): Promise<PostEntity[]> {
    return this.find();
  }
}
