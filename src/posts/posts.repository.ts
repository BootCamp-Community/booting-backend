import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from './posts.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {}
